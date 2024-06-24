import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'hello-world'));

    execSync(`dfx canister uninstall-code hello_world || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy hello_world`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate hello_world`, {
        stdio: 'inherit'
    });
}

pretest();
