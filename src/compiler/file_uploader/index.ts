import { getCanisterId } from '../../../dfx';
import { expandPaths } from './expand_paths';
import { uploadFile } from './upload_file';
import { onBeforeExit } from './on_before_exit';
import { createActor } from './uploader_actor';
import { generateUploaderIdentity } from './uploader_identity';

export type Src = string;
export type Dest = string;

export async function uploadFiles(canisterName: string, paths: [Src, Dest][]) {
    const canisterId = getCanisterId(canisterName);
    const identityName = generateUploaderIdentity(canisterName);
    const actor = await createActor(canisterId, identityName);

    const chunkSize = 2_000_000; // The current message limit is about 2 MB

    const expandedPaths = await expandPaths(paths);

    for (const [srcPath, destPath] of expandedPaths) {
        // Await each upload so the canister doesn't get overwhelmed by requests
        await uploadFile(srcPath, destPath, chunkSize, actor);
    }

    console.info(
        'Finished uploading files. Waiting for file hashing to finish...'
    );

    onBeforeExit(expandedPaths, actor);
}
