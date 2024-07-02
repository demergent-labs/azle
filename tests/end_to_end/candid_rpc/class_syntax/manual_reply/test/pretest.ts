import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(join('examples', 'manual_reply'));

    execSync(`dfx canister uninstall-code manual_reply || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy manual_reply`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate manual_reply`, {
        stdio: 'inherit'
    });
}

pretest();
