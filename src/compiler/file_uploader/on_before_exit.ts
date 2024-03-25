import { Dest, Src } from '.';
import { getListOfIncompleteFiles } from './incomplete_files';

type FileInfo = {
    path: string;
    bytesHashed: number;
    triesSinceLastChange: number;
};

type AmountComplete = number;
type Total = number;
type HashStatus = [AmountComplete, Total];
type HashStatuses = { [path: string]: HashStatus };

export function onBeforeExit(canisterId: string, paths: [Src, Dest][]) {
    let complete = false;
    let ongoingFileHashes: FileInfo[] = [];
    process.on('beforeExit', async (code) => {
        if (complete) {
            // If any async behavior happens in 'beforeExit' then 'beforeExit'
            // will run again. This is need to prevent an infinite loop
            return;
        }
        ongoingFileHashes = await verifyUploadAndHashingComplete(
            canisterId,
            paths,
            ongoingFileHashes
        );

        complete = ongoingFileHashes.length === 0;

        await new Promise((resolve) => setTimeout(resolve, 5000));
    });
}

async function verifyUploadAndHashingComplete(
    canisterId: string,
    paths: [Src, Dest][],
    hashInfos: FileInfo[]
): Promise<FileInfo[]> {
    const incompleteFiles = await getListOfIncompleteFiles(paths, canisterId);
    if (incompleteFiles.length === 0) {
        return [];
    } else {
        const incompleteDestPaths = incompleteFiles.map(([_, path]) => path);
        console.log(`We found ${incompleteDestPaths.length} incomplete files`);
        const hashStatuses = incompleteFiles.reduce(
            (acc: HashStatuses, [_, path]): HashStatuses => {
                return { ...acc, [path]: hashStatus(path) };
            },
            {}
        );
        const ongoingHashInfo = hashInfos
            .filter((hashInfo) => incompleteDestPaths.includes(hashInfo.path))
            .map((hashInfo): FileInfo => {
                if (hashInfo.bytesHashed === hashStatuses[hashInfo.path][0]) {
                    return {
                        ...hashInfo,
                        triesSinceLastChange: hashInfo.triesSinceLastChange + 1,
                        bytesHashed: hashInfo.bytesHashed
                    };
                } else {
                    return {
                        ...hashInfo,
                        bytesHashed: hashInfo.bytesHashed
                    };
                }
            });

        const wasUpdated = ongoingHashInfo.every(
            (fileInfo) => fileInfo.triesSinceLastChange < 5
        );

        if (!wasUpdated) {
            // TODO get hashing percentage and report, if not update after 5 times end the process
            console.log(
                `Missing hashes for ${
                    incompleteFiles.length
                } files:\n${incompleteFiles.join(
                    '\n'
                )}. Waiting 5 seconds and then we'll try again.`
            );
            return [];
        }

        for (const hashInfo of ongoingHashInfo) {
            const [amountComplete, total] = hashStatuses[hashInfo.path];
            const percent = (amountComplete / total) * 100;
            console.info(`${hashInfo.path} at ${percent}% hashed\n`);
        }

        return ongoingHashInfo;
    }
}

function hashStatus(path: string): [AmountComplete, Total] {
    return [1, 2];
}
