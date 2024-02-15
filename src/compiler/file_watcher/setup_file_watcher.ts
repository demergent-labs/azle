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
