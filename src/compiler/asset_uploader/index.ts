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
    replicaWebServerPort: string
) {
    const assetsToUpload = getAssetsToUpload(canisterName);

    const canisterId = getCanisterId(canisterName);

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

export async function uploadSingleAsset(
    canisterName: string,
    replicaWebServerPort: string,
    srcPath: Src,
    destPath: Dest
) {
    const canisterId = getCanisterId(canisterName);

    const actor = await createUploadAssetActor(
        canisterId,
        replicaWebServerPort
    );

    const chunkSize = 2_000_000; // The current message limit is about 2 MiB

    upload(srcPath, destPath, chunkSize, actor);
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

function uploadAsset(
    srcPath: Src,
    destPath: Dest,
    chunkSize: number,
    actor: ActorSubclass
) {
    console.log(`Uploading ${srcPath} to ${destPath}`);
    const assetToUpload = readFileSync(srcPath); // TODO create a readstream and grab chunks, use the code from video and stuff as reference
    const timestamp = process.hrtime.bigint();
    let chunkNumber = 0;

    for (let i = 0; i < assetToUpload.length; i += chunkSize) {
        const chunk = assetToUpload.slice(i, i + chunkSize); // TODO change to subarray

        if (process.env.AZLE_VERBOSE === 'true') {
            console.info(
                `Uploading chunk: ${timestamp}, ${chunkNumber}, ${chunk.length}, ${assetToUpload.length}`
            );
        }

        if (true) {
            console.log('Uploading chunk');
        }

        // TOOD we maybe need to introduce a way to prevent the server from getting overloaded with too many calls
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

        chunkNumber += 1;
    }

    if (process.env.AZLE_VERBOSE === 'true') {
        console.info(`Finished uploading chunks`);
    }
}

function getAssetsToUpload(canisterId: string): [Src, Dest][] {
    const dfxJson: DfxJson = JSON.parse(readFileSync('dfx.json').toString());
    return dfxJson.canisters[canisterId].assets_large ?? [];
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
