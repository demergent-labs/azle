import { Dest, Src } from '.';
import { createClearFileAndInfoActor } from './actors/clear_file_and_info_actor';
import { getListOfIncompleteFiles } from './incomplete_files';
import {
    FileInfo,
    getOngoingHashes,
    reportOnGoingHashes
} from './ongoing_hashes';

export function onBeforeExit(canisterId: string, paths: [Src, Dest][]) {
    let complete = false;
    let cleanUpComplete = false;
    let ongoingFileHashes: FileInfo[] = [];
    process.on('beforeExit', async (code) => {
        if (cleanUpComplete) {
            // If any async behavior happens in 'beforeExit' then 'beforeExit'
            // will run again. This is need to prevent an infinite loop
            return;
        }
        if (complete) {
            await cleanup(canisterId, paths);
            cleanUpComplete = true;
            return;
        }
        ongoingFileHashes = await verifyUploadAndHashingComplete(
            canisterId,
            paths,
            ongoingFileHashes
        );

        complete = ongoingFileHashes.length === 0;

        console.info(`Waiting 5 seconds and then we'll try again.`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
    });
}

async function cleanup(canisterId: string, paths: [Src, Dest][]) {
    const incompleteFiles = await getListOfIncompleteFiles(paths, canisterId);
    for (const [_, path] of incompleteFiles) {
        const actor = await createClearFileAndInfoActor(canisterId);
        await actor.clear_file_and_info(path);
    }
}

async function verifyUploadAndHashingComplete(
    canisterId: string,
    paths: [Src, Dest][],
    previousHashInfos: FileInfo[]
): Promise<FileInfo[]> {
    const incompleteFiles = await getListOfIncompleteFiles(paths, canisterId);
    if (incompleteFiles.length === 0) {
        return [];
    } else {
        const incompleteDestPaths = incompleteFiles.map(([_, path]) => path);

        const ongoingHashInfo = await getOngoingHashes(
            canisterId,
            previousHashInfos,
            incompleteDestPaths
        );

        const wasUpdated = ongoingHashInfo.every(
            (fileInfo) => fileInfo.triesSinceLastChange < 5
        );

        if (!wasUpdated) {
            // TODO get hashing percentage and report, if not update after 5 times end the process
            console.info(
                `Missing hashes for ${
                    incompleteFiles.length
                } files:\n${incompleteFiles.join('\n')}.`
            );
            return [];
        }

        reportOnGoingHashes(ongoingHashInfo);

        return ongoingHashInfo;
    }
}
