import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'simple_user_accounts'));

    execSync(`dfx canister uninstall-code simple_user_accounts || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy simple_user_accounts`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate simple_user_accounts`, {
        stdio: 'inherit'
    });
}

pretest();
