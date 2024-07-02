import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(join('examples', 'ic_api'));

    execSync(`dfx canister uninstall-code ic_api || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy ic_api`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate ic_api`, {
        stdio: 'inherit'
    });
}

pretest();
