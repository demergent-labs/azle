import { execSync } from 'child_process';
import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Secp256k1KeyIdentity } from '@dfinity/identity-secp256k1';
import { existsSync, createReadStream } from 'fs';
import { readFile } from 'fs/promises';
import {
    getCanisterId,
    getIdentityName,
    getWebServerPort
} from '../../../test';
import { readdir, stat } from 'fs/promises';
import { homedir } from 'os';
import { join } from 'path';

type Src = string;
type Dest = string;

export async function uploadFiles(canisterName: string, assets: [Src, Dest][]) {
    const actor = await createUploadAssetActor(
        getCanisterId(canisterName),
        getWebServerPort(),
        getIdentityName()
    );

    const chunkSize = 2_000_000; // The current message limit is about 2 MiB

    for (const [srcPath, destPath] of assets) {
        // Await each upload so the canister doesn't get overwhelmed by requests
        await upload(srcPath, destPath, chunkSize, actor);
    }
}

async function upload(
    srcPath: Src,
    destPath: Dest,
    chunkSize: number,
    actor: ActorSubclass
) {
    if (!existsSync(srcPath)) {
        throw new Error(`${srcPath} does not exist`);
    }

    const stats = await stat(srcPath);
    if (stats.isDirectory()) {
        // Await each upload so the canister doesn't get overwhelmed by requests
        await uploadDirectory(srcPath, destPath, chunkSize, actor);
    } else {
        // Await each upload so the canister doesn't get overwhelmed by requests
        await uploadFile(srcPath, destPath, chunkSize, actor);
    }
}

async function uploadDirectory(
    srcDir: string,
    destDir: string,
    chunkSize: number,
    actor: ActorSubclass
) {
    try {
        const names = await readdir(srcDir);
        for (const name of names) {
            const srcPath = join(srcDir, name);
            const destPath = join(destDir, name);
            // Await each upload so the canister doesn't get overwhelmed by requests
            await upload(srcPath, destPath, chunkSize, actor);
        }
    } catch (error) {
        console.error(`Error reading directory: ${error}`);
    }
}

async function uploadFile(
    srcPath: Src,
    destPath: Dest,
    chunkSize: number,
    actor: ActorSubclass
) {
    console.info(`uploadAsset: Uploading ${srcPath} to ${destPath}`);
    const timestamp = process.hrtime.bigint();
    const stats = await stat(srcPath);
    const size = stats.size;
    for (let i = 0; i < size; i += chunkSize) {
        const fileStream = createReadStream(srcPath, {
            start: i,
            end: i + chunkSize - 1,
            highWaterMark: chunkSize
        });

        let startIndex = i;
        for await (const data of fileStream) {
            await throttle();
            console.info(
                `uploadAsset: ${srcPath} | ${bytesToHumanReadable(
                    i + data.length
                )} of ${bytesToHumanReadable(size)}`
            );
            // Don't await here! Awaiting the agent will result in about a 4x increase in upload time.
            // The above throttling is sufficient to manage the speed of uploads
            actor
                .upload_file_chunk(destPath, timestamp, i, data, size)
                .catch((error) => {
                    console.error(error);
                });
            startIndex += data.length;
        }
    }
    console.info(`uploadAsset: finished ${srcPath}`);
}

function bytesToHumanReadable(sizeInBytes: number): string {
    const suffixes = ['B', 'KiB', 'MiB', 'GiB'];
    // TODO it would be nice if we could figure out an algorithm as simple as
    // TODO this that didn't involve a mutation
    let size = sizeInBytes;

    for (const suffix in suffixes) {
        if (size < 1024.0) {
            return `${size.toFixed(2)} ${suffixes[suffix]}`;
        }
        size /= 1024.0;
    }

    return `${size.toFixed(2)} ${suffixes[suffixes.length - 1]}`;
}

async function throttle() {
    // We can only process about 4Mib per second. So if chunks are about
    // 2 MiB or less then we can only send off two per second.
    if (process.env.DFX_NETWORK === 'ic') {
        await new Promise((resolve) => setTimeout(resolve, 2_000)); // Mainnet requires more throttling. We found 2_000 by trial and error
    }
    await new Promise((resolve) => setTimeout(resolve, 500)); // Should be 500 (ie 1 every 1/2 second or 2 every second)
}

async function getIdentity(
    identityName: string
): Promise<Secp256k1KeyIdentity> {
    const identityPath = join(
        homedir(),
        '.config',
        'dfx',
        'identity',
        identityName,
        'identity.pem'
    );
    return Secp256k1KeyIdentity.fromPem(await readFile(identityPath, 'utf-8'));
}

async function createUploadAssetActor(
    canisterId: string,
    replicaWebServerPort: string,
    identityName: string
): Promise<ActorSubclass> {
    const host =
        process.env.DFX_NETWORK === 'ic'
            ? `https://icp-api.io`
            : `http://127.0.0.1:${replicaWebServerPort}`;

    const agent = new HttpAgent({
        host,
        identity: getIdentity(identityName)
    });

    if (process.env.DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey();
    }

    return Actor.createActor(
        ({ IDL }) => {
            return IDL.Service({
                upload_file_chunk: IDL.Func(
                    [
                        IDL.Text,
                        IDL.Nat64,
                        IDL.Nat64,
                        IDL.Vec(IDL.Nat8),
                        IDL.Nat64
                    ],
                    [],
                    []
                )
            });
        },
        {
            agent,
            canisterId
        }
    );
}
