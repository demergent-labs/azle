import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'echo'));

    execSync(`dfx canister uninstall-code echo || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy echo`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate echo`, {
        stdio: 'inherit'
    });
}

pretest();
