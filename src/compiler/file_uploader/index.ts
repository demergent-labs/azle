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

    let uploadPromises: Promise<void | void[]>[] = [];

    for (const [srcPath, destPath] of expandedPaths) {
        // Await each upload so the canister doesn't get overwhelmed by requests
        let thing = uploadFile(srcPath, destPath, chunkSize, actor).catch(
            async (error) => {
                console.info(`Error uploading ${srcPath}: ${error}`);
                await actor._azle_clear_file_and_info(destPath);
            }
        );
        uploadPromises.push(thing);
    }

    try {
        await Promise.all(uploadPromises);
        console.info('All files uploaded successfully.');
    } catch (error) {
        console.error('One or more uploads failed.');
        console.info(error);
    }

    console.info(
        'Finished uploading files. Waiting for all chunks to finish uploading...' // TODO remove after https://github.com/demergent-labs/azle/issues/1996 is complete
    );

    onBeforeExit(expandedPaths, actor);
}
