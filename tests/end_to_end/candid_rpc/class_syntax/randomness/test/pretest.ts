import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'randomness'));

    execSync(`dfx canister uninstall-code randomness || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy randomness`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate randomness`, {
        stdio: 'inherit'
    });
}

pretest();
