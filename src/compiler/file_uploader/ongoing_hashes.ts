import { Dest, Src } from '.';
import { getListOfIncompleteFiles } from './incomplete_files';
import { UploaderActor } from './uploader_actor';

export type OngoingHashingJob = {
    path: string;
    bytesHashed: bigint;
    totalBytes: bigint;
    triesSinceLastChange: number;
};

type AmountComplete = bigint;
type Total = bigint;
type HashStatus = [AmountComplete, Total];
type HashStatuses = { [path: string]: HashStatus };

export async function getOngoingHashingJobs(
    paths: [Src, Dest][],
    previouslyOngoingJobs: OngoingHashingJob[],
    actor: UploaderActor
): Promise<OngoingHashingJob[]> {
    const incompleteFiles = await getListOfIncompleteFiles(paths, actor);

    if (incompleteFiles.length === 0) {
        return [];
    }

    const incompleteDestPaths = incompleteFiles.map(
        ([_, destPath]) => destPath
    );

    const incompleteHashingJobs = await updateOngoingHashingJobs(
        previouslyOngoingJobs,
        incompleteDestPaths,
        actor
    );

    const isHashingStalled = incompleteHashingJobs.every(
        // If the hash hasn't progressed in the last 5 tries it is considered failed instead of ongoing
        (fileInfo) => fileInfo.triesSinceLastChange >= 5
    );

    if (isHashingStalled) {
        // At the point jobs are considered incomplete instead of ongoing. There
        // are no ongoing jobs to report
        reportIncompleteHashingJobs(incompleteFiles);
        return [];
    }

    reportOngoingHashingJobs(incompleteHashingJobs);

    return incompleteHashingJobs;
}

async function updateOngoingHashingJobs(
    previouslyOngoingJobs: OngoingHashingJob[],
    incompletePaths: string[],
    actor: UploaderActor
): Promise<OngoingHashingJob[]> {
    const latestHashStatuses = await getHashStatuses(incompletePaths, actor);
    const previouslyOngoingHashingJobs = initializePreviousJobsIfNeeded(
        previouslyOngoingJobs,
        latestHashStatuses,
        incompletePaths
    );

    return previouslyOngoingHashingJobs.map((hashInfo): OngoingHashingJob => {
        const newBytesHashed = latestHashStatuses[hashInfo.path][0];
        if (hashInfo.bytesHashed === newBytesHashed) {
            return incrementTries(hashInfo);
        } else {
            return updateBytes(hashInfo, newBytesHashed);
        }
    });
}

function incrementTries(hashJob: OngoingHashingJob): OngoingHashingJob {
    return {
        ...hashJob,
        triesSinceLastChange: hashJob.triesSinceLastChange + 1
    };
}

function updateBytes(
    hashJob: OngoingHashingJob,
    newBytesHashed: bigint
): OngoingHashingJob {
    return {
        ...hashJob,
        bytesHashed: newBytesHashed,
        triesSinceLastChange: 0
    };
}

function reportOngoingHashingJobs(ongoingHashInfo: OngoingHashingJob[]) {
    for (const hashInfo of ongoingHashInfo) {
        const percent =
            (Number(hashInfo.bytesHashed) / Number(hashInfo.totalBytes)) * 100;
        console.info(`${hashInfo.path} at ${percent.toFixed(2)}% hashed`);
    }
    console.info();
}

function reportIncompleteHashingJobs(paths: [Src, Dest][]) {
    console.info(
        `Missing hashes for ${paths.length} files:\n${paths.join('\n')}.`
    );
}

function initializePreviousJobsIfNeeded(
    previousHashInfos: OngoingHashingJob[],
    hashStatuses: HashStatuses,
    incompletePaths: string[]
): OngoingHashingJob[] {
    return previousHashInfos.length > 0
        ? previousHashInfos.filter((hashInfo) =>
              incompletePaths.includes(hashInfo.path)
          )
        : incompletePaths.map((path): OngoingHashingJob => {
              return {
                  path,
                  triesSinceLastChange: 0,
                  bytesHashed: hashStatuses[path][0],
                  totalBytes: hashStatuses[path][1]
              };
          });
}

async function getHashStatuses(
    incompleteFiles: string[],
    actor: UploaderActor
): Promise<HashStatuses> {
    return await incompleteFiles.reduce(
        async (
            accPromise: Promise<HashStatuses>,
            path
        ): Promise<HashStatuses> => {
            const acc = await accPromise;
            return { ...acc, [path]: await getHashStatus(path, actor) };
        },
        Promise.resolve({})
    );
}

/**
 * Returns a tuple with the amount complete at index 0 and the total files size
 * at index 1
 *
 * This is only meant to be used for status updates. The true test for if a hash
 * is complete is to get the hash.
 *
 * @param canisterId The ID of the canister containing the file
 * @param path The path to the file
 * @returns a tuple with the amount complete and the total file size
 */
async function getHashStatus(
    path: string,
    actor: UploaderActor
): Promise<[AmountComplete, Total]> {
    const result = await actor.get_hash_status(path);
    if (result.length === 0) {
        // Files doesn't exist
        return [0n, 0n];
    }
    return result[0];
}
