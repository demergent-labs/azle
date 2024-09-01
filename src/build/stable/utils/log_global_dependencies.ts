import { outputFile } from 'fs-extra';
import { join } from 'path';

import { execSyncPretty } from './exec_sync_pretty';
import { AZLE_PACKAGE_PATH } from './global_paths';

export async function logGlobalDependencies(): Promise<void> {
    const wasiVersion = execSyncPretty('cargo install --list | grep wasi2ic');
    const nodeVersion = execSyncPretty('node --version');
    const rustVersion = execSyncPretty('rustc --version');

    const globalDependencies =
        `wasi2ic version: ${wasiVersion}` +
        `\n` +
        `node version: ${nodeVersion}` +
        `\n` +
        `rustc version: ${rustVersion}`;

    await outputFile(
        join(AZLE_PACKAGE_PATH, 'global_dependencies'),
        globalDependencies
    );
}
