import { IOType } from 'child_process';
import { join } from 'path';

import { execSyncPretty } from '../utils/exec_sync_pretty';
import { AZLE_PACKAGE_PATH } from '../utils/global_paths';

export function runCommand(ioType: IOType): void {
    const dfxExtensionDirectoryPath = join(AZLE_PACKAGE_PATH, 'dfx_extension');
    execSyncPretty(`cd ${dfxExtensionDirectoryPath} && ./install.sh`, ioType);
}
