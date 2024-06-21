import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'candid_encoding'));

    execSync(`dfx canister uninstall-code candid_encoding || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy candid_encoding`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate candid_encoding`, {
        stdio: 'inherit'
    });
}

pretest();
