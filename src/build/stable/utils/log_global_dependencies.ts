import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from './global_paths';
import { getDfxVersionLocal } from './versions/dfx';
import { getNodeVersion } from './versions/node';
import { getRustVersion } from './versions/rust';
import { getWasiVersion } from './versions/wasi2ic';

export async function logGlobalDependencies(): Promise<void> {
    const wasiVersion = getWasiVersion();
    const nodeVersion = getNodeVersion();
    const rustVersion = getRustVersion();
    const dfxVersion = getDfxVersionLocal();

    const globalDependencies = {
        wasi2ic: wasiVersion,
        node: nodeVersion,
        rustc: rustVersion,
        dfx: dfxVersion
    };

    const packageJsonPath = join(AZLE_PACKAGE_PATH, 'package.json');

    const packageJsonContent = await readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);

    await writeFile(
        packageJsonPath,
        JSON.stringify(
            { ...packageJson, azle: { globalDependencies } },
            null,
            4
        )
    );
}
