import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { readFileSync } from 'fs';
import { DfxJson } from '../utils/types';

const canisterId = process.argv[2];
const replicaWebServerPort = process.argv[3];

type Src = string;
type Des = string;

uploadAssets();

async function uploadAssets() {
    const filesToUpload = getAssetsToUpload();

    const actor = await createUploadAssetActor();

    const chunkSize = 2_000_000; // The current message limit is about 2 MiB

    for (let i = 0; i < filesToUpload.length; i++) {
        const [src, des] = filesToUpload[i];
        uploadAsset(src, des, chunkSize, actor);
    }
}

function uploadAsset(
    src: Src,
    des: Des,
    chunkSize: number,
    actor: ActorSubclass
) {
    const reloadedJs = readFileSync(src);
    const timestamp = process.hrtime.bigint();
    let chunkNumber = 0;

    for (let i = 0; i < reloadedJs.length; i += chunkSize) {
        const chunk = reloadedJs.slice(i, i + chunkSize);

        if (process.env.AZLE_VERBOSE === 'true') {
            console.info(
                `Uploading chunk: ${timestamp}, ${chunkNumber}, ${chunk.length}, ${reloadedJs.length}`
            );
        }

        actor
            .upload_asset(des, timestamp, chunkNumber, chunk, reloadedJs.length)
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

function getAssetsToUpload(): [Src, Des][] {
    const dfxJson: DfxJson = JSON.parse(readFileSync('dfx.json').toString());
    return dfxJson.canisters[canisterId].large_assets ?? [];
}

async function createUploadAssetActor(): Promise<ActorSubclass> {
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
