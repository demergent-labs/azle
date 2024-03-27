import { Dest, Src } from '.';
import { getListOfIncompleteFiles } from './incomplete_files';
import { OngoingHashingJob, getOngoingHashingJobs } from './ongoing_hashes';
import { UploaderActor } from './uploader_actor';

export function onBeforeExit(paths: [Src, Dest][], actor: UploaderActor) {
    let hashingComplete = false;
    let cleanUpComplete = false;
    let ongoingHashingJobs: OngoingHashingJob[] = [];

    process.on('beforeExit', async () => {
        if (cleanUpComplete) {
            // If any async behavior happens in 'beforeExit' then 'beforeExit'
            // will run again. This is need to prevent an infinite loop.
            // Once clean up is complete we are ready to exit
            console.log('File hashing finished');
            return;
        }

        if (hashingComplete) {
            await cleanup(paths, actor);
            cleanUpComplete = true;
            return;
        }

        ongoingHashingJobs = await getOngoingHashingJobs(
            paths,
            ongoingHashingJobs,
            actor
        );

        hashingComplete = ongoingHashingJobs.length === 0;

        if (!hashingComplete) {
            console.info(
                `Waiting 5 seconds before checking hashing status again...`
            );
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    });
}

async function cleanup(paths: [Src, Dest][], actor: UploaderActor) {
    const incompleteFiles = await getListOfIncompleteFiles(paths, actor);
    for (const [_, path] of incompleteFiles) {
        await actor.clear_file_and_info(path);
    }
}
