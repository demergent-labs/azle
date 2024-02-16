import { execSync, spawn } from 'child_process';
import { join } from 'path';

export function setupFileWatcher(
    reloadedJsPath: string,
    canisterId: string,
    mainPath: string,
    wasmedgeQuickJsPath: string,
    replicaWebServerPort: string
) {
    try {
        // TODO should we check that this was successful in killing
        // TODO the process and then warn the user if not?
        // TODO should we figure out why the || true
        // TODO does not result in a 0 exit code
        // TODO and look into removing the try catch?
        execSync(`pkill -f ./file_watcher_loader.js || true`);
    } catch (error) {
        // For some reason pkill throws even with || true
    }

    if (process.env.AZLE_AUTORELOAD !== 'true') {
        return;
    }

    const watcherProcess = spawn(
        'node',
        [
            join(__dirname, './file_watcher_loader.js'),
            reloadedJsPath,
            canisterId,
            mainPath,
            wasmedgeQuickJsPath,
            replicaWebServerPort
        ],
        {
            detached: true,
            stdio: 'inherit'
        }
    );

    watcherProcess.unref();
}
