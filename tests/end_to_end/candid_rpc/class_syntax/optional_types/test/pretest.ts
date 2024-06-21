import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'optional_types'));

    execSync(`dfx canister uninstall-code optional_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy optional_types`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate optional_types`, {
        stdio: 'inherit'
    });
}

pretest();
