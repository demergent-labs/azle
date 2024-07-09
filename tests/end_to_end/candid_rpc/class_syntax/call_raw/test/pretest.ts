import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'call_raw'));

    execSync(`dfx canister uninstall-code call_raw || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy call_raw`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate call_raw`, {
        stdio: 'inherit'
    });
}

pretest();
