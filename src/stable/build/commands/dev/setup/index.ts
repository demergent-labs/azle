import { execSyncPretty } from '#utils/exec_sync_pretty';
import { AZLE_ROOT } from '#utils/global_paths';

import { azle } from '../../../../../../package.json';

type DependencyName =
    | 'dfx'
    | 'node'
    | 'rust'
    | 'cargo-auditable'
    | 'cargo-audit'
    | 'cargo-bundle-licenses'
    | 'cargo-deny'
    | 'wasi2ic';

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
        `${AZLE_ROOT}/src/stable/build/commands/dev/setup/${script} ${version}`,
        {
            stdio: 'inherit'
        }
    );
}
