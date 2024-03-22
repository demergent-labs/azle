import { Actor, ActorSubclass } from '@dfinity/agent';
import { createAgent, getCanisterId } from '../../../dfx';
import { expandPaths } from './expand_paths';
import { uploadFile } from './upload_file';
import { onBeforeExit } from './on_before_exit';
import { onExit } from './on_exit';

export type Src = string;
export type Dest = string;

export async function uploadFiles(canisterName: string, paths: [Src, Dest][]) {
    const canisterId = getCanisterId(canisterName);
    const actor = await createUploadFileChunkActor(canisterId);

    const chunkSize = 2_000_000; // The current message limit is about 2 MB

    const expandedPaths = await expandPaths(paths);

    for (const [srcPath, destPath] of expandedPaths) {
        // Await each upload so the canister doesn't get overwhelmed by requests
        await uploadFile(srcPath, destPath, chunkSize, actor);
    }

    onBeforeExit(canisterId, expandedPaths);
    onExit(canisterId, expandedPaths);
}

async function createUploadFileChunkActor(
    canisterId: string
): Promise<ActorSubclass> {
    const agent = await createAgent();

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
