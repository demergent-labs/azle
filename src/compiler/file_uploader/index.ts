import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { readFileSync, stat, existsSync } from 'fs';
import { DfxJson } from '../utils/types';
import { getCanisterId } from '../../../test';
import * as fs from 'fs';
import * as path from 'path';

type Src = string;
type Des = string;

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
        const [src, des] = assetsToUpload[i];
        upload(src, des, chunkSize, actor);
    }
}

async function upload(
    src: Src,
    des: Des,
    chunkSize: number,
    actor: ActorSubclass
) {
    if (!existsSync(src)) {
        console.log(`WARNING: ${src} does not exist`);
        return;
    }

    if (await isDirectory(src)) {
        uploadDirectory(src, des, chunkSize, actor);
    } else {
        uploadAsset(src, des, chunkSize, actor);
    }
}

async function isDirectory(path: string): Promise<boolean> {
    try {
        return await new Promise((resolve, reject) => {
            stat(path, (err, stats) => {
                if (err) reject(err);
                else resolve(stats.isDirectory());
            });
        });
    } catch (error) {
        return false;
    }
}

function uploadAsset(
    src: Src,
    des: Des,
    chunkSize: number,
    actor: ActorSubclass
) {
    console.log(`Uploading ${src} to ${des}`);
    const assetToUpload = readFileSync(src);
    const timestamp = process.hrtime.bigint();
    let chunkNumber = 0;

    for (let i = 0; i < assetToUpload.length; i += chunkSize) {
        const chunk = assetToUpload.slice(i, i + chunkSize);

        if (process.env.AZLE_VERBOSE === 'true') {
            console.info(
                `Uploading chunk: ${timestamp}, ${chunkNumber}, ${chunk.length}, ${assetToUpload.length}`
            );
        }

        if (true) {
            console.log('Uploading chunk');
        }

        actor
            .upload_asset(
                des,
                timestamp,
                chunkNumber,
                chunk,
                assetToUpload.length
            )
            .catch((error) => {
                console.log('Hey it was an error');
                console.log(error);
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

function getAssetsToUpload(canisterId: string): [Src, Des][] {
    const dfxJson: DfxJson = JSON.parse(readFileSync('dfx.json').toString());
    return dfxJson.canisters[canisterId].large_assets ?? [];
}

async function createUploadAssetActor(
    canisterId: string,
    replicaWebServerPort: string
): Promise<ActorSubclass> {
    const agent = new HttpAgent({
        host: `http://127.0.0.1:${replicaWebServerPort}`
    });

    // TODO do I need this for this thing?
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
    src: string,
    des: string,
    chunkSize: number,
    actor: ActorSubclass
) {
    try {
        const files = await fs.promises.readdir(src);
        for (const file of files) {
            const filePath = path.join(src, file);
            const desPath = path.join(des, file);
            upload(filePath, desPath, chunkSize, actor);
        }
    } catch (error) {
        console.error(`Error reading directory: ${error}`);
    }
}
