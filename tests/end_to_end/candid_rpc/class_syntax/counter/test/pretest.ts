import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'counter'));

    execSync(`dfx canister uninstall-code counter || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy counter`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate counter`, {
        stdio: 'inherit'
    });
}

pretest();
