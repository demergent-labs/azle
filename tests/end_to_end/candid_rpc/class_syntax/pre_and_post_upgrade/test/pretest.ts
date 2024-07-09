import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
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
