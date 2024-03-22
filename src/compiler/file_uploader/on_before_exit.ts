import { Dest, Src } from '.';
import { getListOfIncompleteFiles } from './incomplete_files';

export function onBeforeExit(canisterId: string, paths: [Src, Dest][]) {
    let complete = false;
    let endAttempts = 0;
    process.on('beforeExit', async (code) => {
        endAttempts++;
        if (complete) {
            // If any async behavior happens in 'beforeExit' then 'beforeExit'
            // will run again. This is need to prevent an infinite loop
            return;
        }
        complete = await verifyUploadAndHashingComplete(
            canisterId,
            paths,
            false // TODO end after a number of attempts?
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
    });
}

async function verifyUploadAndHashingComplete(
    canisterId: string,
    paths: [Src, Dest][],
    finished: boolean
): Promise<boolean> {
    let incompleteFiles = await getListOfIncompleteFiles(paths, canisterId);
    if (incompleteFiles.length === 0 || finished) {
        return true;
    } else {
        console.log(
            `Missing hashes for ${
                incompleteFiles.length
            } files:\n${incompleteFiles.join(
                '\n'
            )}. Waiting 5 seconds and then we'll try again.`
        );
        return false;
    }
}
