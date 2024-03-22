import { Src, Dest } from '.';
import { getListOfIncompleteFiles } from './incomplete_files';

export function onExit(canisterId: string, paths: [Src, Dest][]) {
    process.on('exit', async (code) => {
        const incompleteFiles = await getListOfIncompleteFiles(
            paths,
            canisterId
        );
        for (const incompleteFile of incompleteFiles) {
            // TODO I actually thing I want to do the file clean up here, because it's not strictly necessary for the performance of the canister. So we could delete in the background
            console.log(`TODO remove ${incompleteFile}`);
        }
    });
}
