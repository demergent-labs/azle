import { Dest, Src } from '.';
import { getListOfIncompleteFiles } from './incomplete_files';
import { UploaderActor } from './uploader_actor';

export function onBeforeExit(paths: [Src, Dest][], actor: UploaderActor): void {
    let cleanUpComplete = false;

    process.on('beforeExit', async () => {
        if (cleanUpComplete) {
            // If any async behavior happens in 'beforeExit' then 'beforeExit'
            // will run again. This is need to prevent an infinite loop.
            // Once clean up is complete we are ready to exit
            console.info('File hashing finished');
            return;
        }

        console.info('Cleaning up incomplete files');
        await cleanup(paths, actor);
        cleanUpComplete = true;
        return;
    });
}

async function cleanup(
    paths: [Src, Dest][],
    actor: UploaderActor
): Promise<void> {
    const incompleteFiles = await getListOfIncompleteFiles(paths, actor);
    for (const [_, path] of incompleteFiles) {
        await actor._azle_clear_file_and_info(path);
    }
}
