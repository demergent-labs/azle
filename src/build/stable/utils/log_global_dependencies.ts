import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from './global_paths';
import { getDfxVersionLocal } from './versions/dfx';
import { getNodeVersionLocal } from './versions/node';
import { getRustVersionLocal } from './versions/rust';
import { getWasi2icVersionLocal } from './versions/wasi2ic';

export async function logGlobalDependencies(): Promise<void> {
    const wasiVersion = getWasi2icVersionLocal();
    const nodeVersion = getNodeVersionLocal();
    const rustVersion = getRustVersionLocal();
    const dfxVersion = getDfxVersionLocal();

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
        JSON.stringify(
            { ...packageJson, azle: { globalDependencies } },
            null,
            4
        )
    );
}
