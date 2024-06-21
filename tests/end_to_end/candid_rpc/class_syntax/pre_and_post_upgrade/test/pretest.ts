import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'pre_and_post_upgrade'));

    execSync(`dfx canister uninstall-code pre_and_post_upgrade || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy pre_and_post_upgrade`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate pre_and_post_upgrade`, {
        stdio: 'inherit'
    });
}

pretest();
