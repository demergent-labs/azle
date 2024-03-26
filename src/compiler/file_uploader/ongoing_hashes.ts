import { Dest, Src } from '.';
import { getListOfIncompleteFiles } from './incomplete_files';
import { createActor } from './uploader_actor';

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
    canisterId: string,
    paths: [Src, Dest][],
    previouslyOngoingJobs: OngoingHashingJob[]
): Promise<OngoingHashingJob[]> {
    const incompleteFiles = await getListOfIncompleteFiles(paths, canisterId);

    if (incompleteFiles.length === 0) {
        return [];
    }

    const incompleteDestPaths = incompleteFiles.map(([_, path]) => path);

    const incompleteHashingJobs = await updateOngoingHashingJobs(
        canisterId,
        previouslyOngoingJobs,
        incompleteDestPaths
    );

    const areStillOngoing = incompleteHashingJobs.every(
        // If the hash hasn't progressed in the last 5 tries it is considered failed instead of ongoing
        (fileInfo) => fileInfo.triesSinceLastChange < 5
    );

    if (!areStillOngoing) {
        // At the point jobs are considered incomplete instead of ongoing. There
        // are no ongoing jobs to report
        reportIncompleteHashingJobs(incompleteFiles);
        return [];
    }

    reportOnGoingHashingJobs(incompleteHashingJobs);

    return incompleteHashingJobs;
}

async function updateOngoingHashingJobs(
    canisterId: string,
    previouslyOngoingJobs: OngoingHashingJob[],
    incompletePaths: string[]
): Promise<OngoingHashingJob[]> {
    const hashStatuses = await getHashStatuses(canisterId, incompletePaths);
    const previouslyOngoingHashingJobs = initializePreviousJobsIfNeeded(
        previouslyOngoingJobs,
        hashStatuses,
        incompletePaths
    );
    return previouslyOngoingHashingJobs
        .filter((hashInfo) => incompletePaths.includes(hashInfo.path))
        .map((hashInfo): OngoingHashingJob => {
            const newBytesHashed = hashStatuses[hashInfo.path][0];
            if (hashInfo.bytesHashed === newBytesHashed) {
                return {
                    ...hashInfo,
                    triesSinceLastChange: hashInfo.triesSinceLastChange + 1
                };
            } else {
                return {
                    ...hashInfo,
                    bytesHashed: newBytesHashed,
                    triesSinceLastChange: 0
                };
            }
        });
}

function reportOnGoingHashingJobs(ongoingHashInfo: OngoingHashingJob[]) {
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
) {
    return previousHashInfos.length > 0
        ? previousHashInfos
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
    canisterId: string,
    incompleteFiles: string[]
): Promise<HashStatuses> {
    return await incompleteFiles.reduce(
        async (
            accPromise: Promise<HashStatuses>,
            path
        ): Promise<HashStatuses> => {
            const acc = await accPromise;
            return { ...acc, [path]: await getHashStatus(canisterId, path) };
        },
        Promise.resolve({})
    );
}

/**
 * Returns a tuple with the amount complete at 0 and the total files size at 1
 *
 * This is only meant to be used for status updates. The true test for if a hash
 * is complete is to get the hash.
 *
 * @param canisterId The ID of the canister containing the file
 * @param path The path to the file
 * @returns a tuple with the amount complete and the total file size
 */
async function getHashStatus(
    canisterId: string,
    path: string
): Promise<[AmountComplete, Total]> {
    const actor = await createActor(canisterId);
    const result = await actor.get_hash_status(path);
    if (result.length === 0) {
        // Files doesn't exist
        return [0n, 0n];
    }
    return result[0];
}
