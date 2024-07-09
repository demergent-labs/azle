import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(join('examples', 'optional_types'));

    execSync(`dfx canister uninstall-code optional_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy optional_types`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate optional_types`, {
        stdio: 'inherit'
    });
}

pretest();
