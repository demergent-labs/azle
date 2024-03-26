import { Dest, Src } from '.';
import { createActor } from './uploader_actor';
import { getListOfIncompleteFiles } from './incomplete_files';
import { OngoingHashingJob, getOngoingHashingJobs } from './ongoing_hashes';

export function onBeforeExit(canisterId: string, paths: [Src, Dest][]) {
    let hashingComplete = false;
    let cleanUpComplete = false;
    let ongoingHashingJobs: OngoingHashingJob[] = [];
    process.on('beforeExit', async () => {
        if (cleanUpComplete) {
            // If any async behavior happens in 'beforeExit' then 'beforeExit'
            // will run again. This is need to prevent an infinite loop.
            // Once clean up is complete we are ready to exit
            return;
        }
        if (hashingComplete) {
            await cleanup(canisterId, paths);
            cleanUpComplete = true;
            return;
        }
        ongoingHashingJobs = await getOngoingHashingJobs(
            canisterId,
            paths,
            ongoingHashingJobs
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

async function cleanup(canisterId: string, paths: [Src, Dest][]) {
    const incompleteFiles = await getListOfIncompleteFiles(paths, canisterId);
    for (const [_, path] of incompleteFiles) {
        const actor = await createActor(canisterId);
        await actor.clear_file_and_info(path);
    }
}
