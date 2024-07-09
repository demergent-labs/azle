import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'bytes'));

    execSync(`dfx canister uninstall-code bytes_canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy bytes_canister`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate bytes_canister`, {
        stdio: 'inherit'
    });
}

pretest();
