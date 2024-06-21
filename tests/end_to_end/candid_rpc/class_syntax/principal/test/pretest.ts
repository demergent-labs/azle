import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'principal'));

    execSync(`dfx canister uninstall-code principal || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy principal`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate principal`, {
        stdio: 'inherit'
    });
}

pretest();
