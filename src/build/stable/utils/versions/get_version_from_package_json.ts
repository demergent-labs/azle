import { readFile } from 'fs/promises';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from '../global_paths';

export async function getVersionFromPackageJson(name: string): Promise<string> {
    const packageJson = JSON.parse(
        await readFile(join(AZLE_PACKAGE_PATH, 'package.json'), 'utf-8')
    );

    const version = packageJson?.azle?.globalDependencies[name];

    if (version !== undefined) {
        return version;
    } else {
        throw new Error(`${name} version not found in azle.globalDependencies`);
    }
}
