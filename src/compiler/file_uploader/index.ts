import { getCanisterId } from '../../../dfx';
import { generateUploaderIdentity } from '../uploader_identity';
import { expandPaths } from './expand_paths';
import { onBeforeExit } from './on_before_exit';
import { uploadFile } from './upload_file';
import { createActor } from './uploader_actor';

export type Src = string;
export type Dest = string;

export async function uploadFiles(
    canisterName: string,
    paths: [Src, Dest][]
): Promise<void> {
    if (
        paths.length === 0 ||
        process.env.AZLE_DISABLE_AUTO_FILE_UPLOAD === 'true'
    ) {
        return;
    }

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
        'Finished uploading files. Waiting for all async processes to end...' // TODO what's happening is that the last bit of the uploadFile doesn't await the last chunk I think, so we do still need to add the onBeforeExit so we don't exit until that is done
    );

    onBeforeExit(expandedPaths, actor);
}
