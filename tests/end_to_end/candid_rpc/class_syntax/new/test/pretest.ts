import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

import { version } from '../../../package.json';

async function pretest() {
    linkAndInstallPatch(join('examples', 'new'));

    execSync(`npx -y azle@${version} new hello_world`, {
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
