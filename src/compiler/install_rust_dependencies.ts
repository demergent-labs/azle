import { execSync } from 'child_process';
import { resolve } from 'path';

export function installRustDependencies(
    azleVersion: string,
    rustVersion: string
) {
    const installRustDependenciesPath = resolve(
        __dirname,
        '../../install_rust_dependencies.sh'
    );

    execSync(`"${installRustDependenciesPath}" ${azleVersion} ${rustVersion}`, {
        stdio: 'inherit'
    });
}
