import { IOType } from 'child_process';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { execSyncPretty } from '../../utils/exec_sync_pretty';
import { AZLE_PACKAGE_PATH } from '../../utils/global_paths';

type DependencyName = 'node' | 'dfx' | 'rust' | 'wasi2ic';

type Versions = {
    [key in DependencyName]: string;
};

type Dependencies = {
    [key in DependencyName]: boolean;
};

export async function runCommand(
    dependenciesToInstall: Dependencies,
    ioType: IOType
): Promise<void> {
    for (const key in dependenciesToInstall) {
        const dependency = key as DependencyName;
        if (dependenciesToInstall[dependency] === true) {
            installDependency(dependency, ioType);
        }
    }
}

async function installDependency(
    dependency: DependencyName,
    ioType: IOType
): Promise<void> {
    console.info(`Installing ${dependency}...`);
    const version = (await getGlobalDependencies())[dependency];
    const script = `install_${dependency}.sh`;
    execSyncPretty(
        `${AZLE_PACKAGE_PATH}/src/build/stable/commands/install_global_dependencies/${script} ${version}`,
        ioType
    );
}

async function getGlobalDependencies(): Promise<Versions> {
    const packageJsonPath = join(AZLE_PACKAGE_PATH, 'package.json');

    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));

    const globalDependencies = packageJson.azle.globalDependencies;

    if (globalDependencies === undefined) {
        throw new Error('No globalDependencies found in package.json.');
    }

    return globalDependencies;
}
