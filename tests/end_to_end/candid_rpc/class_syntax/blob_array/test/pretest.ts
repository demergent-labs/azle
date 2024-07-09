import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'blob_array'));

    execSync(`dfx canister uninstall-code blob_array || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy blob_array`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate blob_array`, {
        stdio: 'inherit'
    });
}

pretest();
