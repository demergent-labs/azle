import { createActor } from './actors/hash_status_actor';

export type FileInfo = {
    path: string;
    bytesHashed: bigint;
    totalBytes: bigint;
    triesSinceLastChange: number;
};

type AmountComplete = bigint;
type Total = bigint;
type HashStatus = [AmountComplete, Total];
type HashStatuses = { [path: string]: HashStatus };

export async function getOngoingHashes(
    canisterId: string,
    previousHashInfos: FileInfo[],
    incompletePaths: string[]
): Promise<FileInfo[]> {
    const hashStatuses = await getHashStatuses(canisterId, incompletePaths);
    const hashInfos = getHashInfos(
        previousHashInfos,
        hashStatuses,
        incompletePaths
    );
    return hashInfos
        .filter((hashInfo) => incompletePaths.includes(hashInfo.path))
        .map((hashInfo): FileInfo => {
            const newBytesHashed = hashStatuses[hashInfo.path][0];
            if (hashInfo.bytesHashed === newBytesHashed) {
                return {
                    ...hashInfo,
                    triesSinceLastChange: hashInfo.triesSinceLastChange + 1
                };
            } else {
                return {
                    ...hashInfo,
                    bytesHashed: newBytesHashed
                };
            }
        });
}

export function reportOnGoingHashes(ongoingHashInfo: FileInfo[]) {
    for (const hashInfo of ongoingHashInfo) {
        const percent =
            (Number(hashInfo.bytesHashed) / Number(hashInfo.totalBytes)) * 100;
        console.info(`${hashInfo.path} at ${percent.toFixed(2)}% hashed`);
    }
    console.info();
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

function getHashInfos(
    previousHashInfos: FileInfo[],
    hashStatuses: HashStatuses,
    incompletePaths: string[]
) {
    return previousHashInfos.length > 0
        ? previousHashInfos
        : incompletePaths.map((path): FileInfo => {
              return {
                  path,
                  triesSinceLastChange: 0,
                  bytesHashed: hashStatuses[path][0],
                  totalBytes: hashStatuses[path][1]
              };
          });
}

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
    return result[0] as [AmountComplete, Total];
}
