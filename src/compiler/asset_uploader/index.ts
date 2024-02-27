import { execSync } from 'child_process';
import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { readFileSync } from 'fs';
import { DfxJson } from '../utils/types';
import { getCanisterId } from '../../../test';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

type Src = string;
type Dest = string;

export async function uploadAssets(
    canisterName: string,
    srcPath?: Src,
    destPath?: Dest
) {
    const assetsToUpload = getAssetsToUpload(canisterName, srcPath, destPath);

    const canisterId = getCanisterId(canisterName);

    const replicaWebServerPort = execSync(`dfx info webserver-port`)
        .toString()
        .trim();
    const actor = await createUploadAssetActor(
        canisterId,
        replicaWebServerPort
    );

    const chunkSize = 2_000_000; // The current message limit is about 2 MiB

    for (let i = 0; i < assetsToUpload.length; i++) {
        const [srcPath, destPath] = assetsToUpload[i];
        // Don't await, fire off all of the uploads as fast as we can
        upload(srcPath, destPath, chunkSize, actor);
    }
}

async function upload(
    srcPath: Src,
    destPath: Dest,
    chunkSize: number,
    actor: ActorSubclass
) {
    if (!(await exists(srcPath))) {
        console.log(`WARNING: ${srcPath} does not exist`);
        return;
    }

    if (await isDirectory(srcPath)) {
        await uploadDirectory(srcPath, destPath, chunkSize, actor);
    } else {
        uploadAsset(srcPath, destPath, chunkSize, actor);
    }
}

async function isDirectory(path: string): Promise<boolean> {
    const stats = await stat(path);
    return stats.isDirectory();
}

async function exists(path: string): Promise<boolean> {
    try {
        await stat(path);
        return true; // File exists
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            return false; // File does not exist
        } else {
            throw error; // Other error occurred
        }
    }
}

async function uploadAsset(
    srcPath: Src,
    destPath: Dest,
    chunkSize: number,
    actor: ActorSubclass
) {
    console.log(`Uploading ${srcPath} to ${destPath}`);
    const assetToUpload = readFileSync(srcPath); // TODO create a readstream and grab chunks, use the code from video and stuff as reference
    const timestamp = process.hrtime.bigint();
    let chunkNumber = 0;

    let numRequests = 0;

    for (let i = 0; i < assetToUpload.length; i += chunkSize) {
        numRequests += 1;
        const chunk = assetToUpload.slice(i, i + chunkSize); // TODO change to subarray

        if (process.env.AZLE_VERBOSE === 'true') {
            console.info(
                `Uploading chunk: ${timestamp}, ${chunkNumber}, ${chunk.length}, ${assetToUpload.length}`
            );
        }

        if (true) {
            console.log(
                `Uploading chunk ${i / chunkSize + 1} of ${Math.ceil(
                    assetToUpload.length / chunkSize
                )}`
            );
        }

        // TODO add comment about firing off
        actor
            .upload_asset(
                destPath,
                timestamp,
                chunkNumber,
                chunk,
                assetToUpload.length
            )
            .catch((error) => {
                if (process.env.AZLE_VERBOSE === 'true') {
                    console.error(error);
                }
            });
        if (numRequests % 2 === 0) {
            // We can only process about 4Mib per second. So if chunks are about
            // 2 MiB or less then we can only send off two per second.
            // TODO This means we should probably await all of the calls to here
            // so we don't overload it on a whole directory?
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        chunkNumber += 1;
    }

    if (process.env.AZLE_VERBOSE === 'true') {
        console.info(`Finished uploading chunks`);
    }
}

function getAssetsToUpload(
    canisterId: string,
    srcPath?: Src,
    destPath?: Dest
): [Src, Dest][] {
    if (srcPath === undefined && destPath !== undefined) {
        throw new Error(
            'Dest path must not be undefined if a src path is defined'
        );
    } else if (srcPath !== undefined && destPath === undefined) {
        throw new Error(
            'Src path must not be undefined if a dest path is defined'
        );
    } else if (srcPath === undefined && destPath === undefined) {
        // If both paths are undefined, look at the dfx.json for the assets to upload
        const dfxJson: DfxJson = JSON.parse(
            readFileSync('dfx.json').toString()
        );
        return dfxJson.canisters[canisterId].assets_large ?? [];
    } else if (srcPath !== undefined && destPath !== undefined) {
        return [[srcPath, destPath]];
    }
    throw new Error('Unreachable');
}

async function createUploadAssetActor(
    canisterId: string,
    replicaWebServerPort: string
): Promise<ActorSubclass> {
    //TODO This will break on mainnet
    const agent = new HttpAgent({
        host: `http://127.0.0.1:${replicaWebServerPort}`
    });

    if (process.env.DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey();
    }

    return Actor.createActor(
        ({ IDL }) => {
            return IDL.Service({
                upload_asset: IDL.Func(
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
            // Don't await, fire off all of the uploads as fast as we can
            upload(srcPath, destPath, chunkSize, actor);
        }
    } catch (error) {
        console.error(`Error reading directory: ${error}`);
    }
}
