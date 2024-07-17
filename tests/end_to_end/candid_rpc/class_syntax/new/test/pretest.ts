import { execSync } from 'child_process';

import { version } from '../../../../../../package.json';

function pretest(): void {
    execSync(`npx -y azle@${version} new hello_world --http-server`, {
        stdio: 'inherit'
    });

    execSync(`npx -y azle@${version} install-dfx-extension`, {
        stdio: 'inherit'
    });

    execSync(`cd hello_world && dfx canister uninstall-code backend || true`, {
        stdio: 'inherit'
    });

    execSync(`cd hello_world && npm install`, {
        stdio: 'inherit'
    });

    execSync(`cd hello_world && dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();