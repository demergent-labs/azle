import { spawn } from 'child_process';
import { join } from 'path';

import { execSyncPretty } from '../../../../stable/utils/exec_sync_pretty';
import { AZLE_PACKAGE_PATH } from '../../../../stable/utils/global_paths';

export function setupFileWatcher(
    reloadedJsPath: string,
    canisterId: string,
    mainPath: string,
    esmAliases: Record<string, string>,
    esmExternals: string[],
    canisterName: string,
    postUpgradeIndex: number
): void {
    try {
        // TODO should we check that this was successful in killing
        // TODO the process and then warn the user if not?
        // TODO should we figure out why the || true
        // TODO does not result in a 0 exit code
        // TODO and look into removing the try catch?
        execSyncPretty(`pkill -f ./file_watcher_loader.js || true`);
    } catch (error) {
        // For some reason pkill throws even with || true
    }

    if (process.env.AZLE_AUTORELOAD !== 'true') {
        return;
    }

    const watcherProcess = spawn(
        'node',
        [
            join(
                AZLE_PACKAGE_PATH,
                'src',
                'build',
                'experimental',
                'commands',
                'compile',
                'file_watcher',
                'file_watcher_loader.js'
            ),
            reloadedJsPath,
            canisterId,
            mainPath,
            JSON.stringify(esmAliases),
            JSON.stringify(esmExternals),
            canisterName,
            postUpgradeIndex.toString()
        ],
        {
            detached: true,
            stdio: 'inherit'
        }
    );

    watcherProcess.unref();
}
