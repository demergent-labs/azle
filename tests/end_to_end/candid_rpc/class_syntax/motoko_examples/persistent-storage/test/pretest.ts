import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'persistent-storage'));

    execSync(`dfx canister uninstall-code persistent_storage || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy persistent_storage`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate persistent_storage`, {
        stdio: 'inherit'
    });
}

pretest();
