import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'threshold_ecdsa'));

    execSync(`dfx canister uninstall-code threshold_ecdsa || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy threshold_ecdsa`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate threshold_ecdsa`, {
        stdio: 'inherit'
    });
}

pretest();
