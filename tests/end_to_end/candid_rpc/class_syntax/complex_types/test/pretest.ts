import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'complex_types'));

    execSync(`dfx canister uninstall-code complex_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy complex_types`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate complex_types`, {
        stdio: 'inherit'
    });
}

pretest();
