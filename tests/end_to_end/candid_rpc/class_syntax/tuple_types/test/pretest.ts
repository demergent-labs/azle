import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'tuple_types'));

    execSync(`dfx canister uninstall-code tuple_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy tuple_types`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate tuple_types`, {
        stdio: 'inherit'
    });
}

pretest();
