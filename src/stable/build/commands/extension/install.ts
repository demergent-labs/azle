import { IOType } from 'child_process';
import { join } from 'path';

import { execSyncPretty } from '#utils/exec_sync_pretty';
import { AZLE_ROOT } from '#utils/global_paths';

export function runCommand(ioType: IOType): void {
    const dfxExtensionDirectoryPath = join(
        AZLE_ROOT,
        'src',
        'stable',
        'build',
        'dfx_extension'
    );
    execSyncPretty(
        `./install.sh`,
        {
            stdio: ioType,
            cwd: dfxExtensionDirectoryPath
        },
        'dfx extension installation script execution failed'
    );

    console.info('azle dfx extension successfully installed');
}
