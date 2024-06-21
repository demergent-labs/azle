import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'simple-to-do'));

    execSync(`dfx canister uninstall-code simple_to_do || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy simple_to_do`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate simple_to_do`, {
        stdio: 'inherit'
    });
}

pretest();
