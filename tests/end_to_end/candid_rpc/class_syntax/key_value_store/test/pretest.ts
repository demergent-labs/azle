import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'key_value_store'));

    execSync(`dfx canister uninstall-code key_value_store || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy key_value_store`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate key_value_store`, {
        stdio: 'inherit'
    });
}

pretest();
