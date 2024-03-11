import { execSync } from 'child_process';
import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { existsSync, createReadStream } from 'fs';
import { getCanisterId } from '../../../test';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

type Src = string;
type Dest = string;

/**
 * Upload an asset at srcPath to destPath at the given canister. If neither
 * the srcPath nor the destPath are given the srcPath(s) and destPath(s) will
 * be determined from the dfx.json of the given canister.
 *
 * Because of limitations on block consensus rate and ingress message limits
 * the uploaded assets will be broken up into 2 MB chunks (to be less than the
 * message size limit) and sent to the canister 2 chunks per second so as to be
 * bellow the 4MiB per second block rate. For small chunks more could be sent
 * per second but for simplicity it has been capped at 2 chunks per second.
 *
 * The time it takes to upload a file is largely determined by the amount of
 * throttling. In good circumstances a 1 GiB will therefore take about 5 minutes
 * to upload.
 * @param canisterName
 * @param srcPath
 * @param destPath
 */
export async function uploadAssets(
    canisterName: string,
    assets: [Src, Dest][]
) {
    const canisterId = getCanisterId(canisterName);

    const replicaWebServerPort = execSync(`dfx info webserver-port`)
        .toString()
        .trim();

    const actor = await createUploadAssetActor(
        canisterId,
        replicaWebServerPort
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
        await uploadAsset(srcPath, destPath, chunkSize, actor);
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

async function uploadAsset(
    srcPath: Src,
    destPath: Dest,
    chunkSize: number,
    actor: ActorSubclass
) {
    console.info(`uploadAsset: Uploading ${srcPath} to ${destPath}`);
    const timestamp = process.hrtime.bigint();
    const stats = await stat(srcPath);
    const size = stats.size;
    let chunkNumber = 0;
    for (let i = 0; i < size; i += chunkSize) {
        const fileStream = createReadStream(srcPath, {
            start: i,
            end: i + chunkSize - 1,
            highWaterMark: chunkSize
        });

        for await (const data of fileStream) {
            await throttle();
            console.info(
                `uploadAsset: ${srcPath} | ${chunkNumber + 1} of ~${Math.ceil(
                    size / chunkSize
                )}`
            );
            // Don't await here! Awaiting the agent will result in about a 4x increase in upload time.
            // The above throttling is sufficient to manage the speed of uploads
            actor
                .upload_file_chunk(destPath, timestamp, chunkNumber, data, size)
                .catch((error) => {
                    console.error(error);
                });
            chunkNumber++;
        }
    }
    console.info(`uploadAsset: finished ${srcPath}`);
}

async function throttle() {
    // We can only process about 4Mib per second. So if chunks are about
    // 2 MiB or less then we can only send off two per second.
    if (process.env.DFX_NETWORK === 'ic') {
        await new Promise((resolve) => setTimeout(resolve, 2_000)); // Mainnet requires more throttling. We found 2_000 by trial and error
    }
    await new Promise((resolve) => setTimeout(resolve, 500)); // Should be 500 (ie 1 every 1/2 second or 2 every second)
}

async function createUploadAssetActor(
    canisterId: string,
    replicaWebServerPort: string
): Promise<ActorSubclass> {
    const host =
        process.env.DFX_NETWORK === 'ic'
            ? `https://icp-api.io`
            : `http://127.0.0.1:${replicaWebServerPort}`;

    const agent = new HttpAgent({
        host
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
