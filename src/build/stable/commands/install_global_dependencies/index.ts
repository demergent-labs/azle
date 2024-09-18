import { IOType } from 'child_process';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { execSyncPretty } from '../../utils/exec_sync_pretty';
import { AZLE_PACKAGE_PATH } from '../../utils/global_paths';

type ValidFlag = 'node' | 'dfx' | 'rustc' | 'wasi2ic';

type Versions = {
    [key in ValidFlag]: string;
};

type Dependencies = {
    [key in ValidFlag]: boolean;
};

export async function runCommand(
    dependencies: Dependencies,
    ioType: IOType
): Promise<void> {
    for (const key in dependencies) {
        const dependency = key as ValidFlag;
        if (dependencies[dependency]) installDependency(dependency, ioType);
    }
}

async function installDependency(
    dependency: ValidFlag,
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
