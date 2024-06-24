import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'quicksort'));

    execSync(`dfx canister uninstall-code quicksort || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy quicksort`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate quicksort`, {
        stdio: 'inherit'
    });
}

pretest();
