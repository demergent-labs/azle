import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'primitive_types'));

    execSync(`dfx canister uninstall-code primitive_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy primitive_types`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate primitive_types`, {
        stdio: 'inherit'
    });
}

pretest();
