import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from './global_paths';
import { getLocalDfxVersion } from './versions/dfx';
import { getLocalNodeVersion } from './versions/node';
import { getLocalRustVersion } from './versions/rust';
import { getLocalWasi2icVersion } from './versions/wasi2ic';

export async function logGlobalDependencies(): Promise<void> {
    const wasiVersion = getLocalWasi2icVersion();
    const nodeVersion = getLocalNodeVersion();
    const rustVersion = getLocalRustVersion();
    const dfxVersion = getLocalDfxVersion();

    const globalDependencies = {
        wasi2ic: wasiVersion,
        node: nodeVersion,
        rust: rustVersion,
        dfx: dfxVersion
    };

    const packageJsonPath = join(AZLE_PACKAGE_PATH, 'package.json');

    const packageJsonContent = await readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);

    await writeFile(
        packageJsonPath,
        `${JSON.stringify(
            { ...packageJson, azle: { globalDependencies } },
            null,
            4
        )}\n`
    );
}
