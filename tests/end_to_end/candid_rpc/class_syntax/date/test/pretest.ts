import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(join('examples', 'date'));

    execSync(`dfx canister uninstall-code date || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy date`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate date`, {
        stdio: 'inherit'
    });
}

pretest();
