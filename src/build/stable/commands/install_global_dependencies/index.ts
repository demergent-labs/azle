import { azle } from '../../../../../package.json';
import { execSyncPretty } from '../../utils/exec_sync_pretty';
import { AZLE_PACKAGE_PATH } from '../../utils/global_paths';

type DependencyName = 'node' | 'dfx' | 'rust' | 'wasi2ic';

type DependencyInstallInfo = {
    [key in DependencyName]: boolean;
};

export async function runCommand(
    dependenciesToInstall: DependencyInstallInfo
): Promise<void> {
    for (const key in dependenciesToInstall) {
        const dependency = key as DependencyName;
        if (dependenciesToInstall[dependency] === true) {
            installDependency(dependency);
        }
    }
}

function installDependency(dependency: DependencyName): void {
    console.info(`Installing ${dependency}...`);
    const version = azle.globalDependencies[dependency];
    const script = `install_${dependency}.sh`;
    execSyncPretty(
        `${AZLE_PACKAGE_PATH}/src/build/stable/commands/install_global_dependencies/${script} ${version}`,
        'inherit'
    );
}
