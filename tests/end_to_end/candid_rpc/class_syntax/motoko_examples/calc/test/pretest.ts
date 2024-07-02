import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(join('examples', 'motoko_examples', 'calc'));

    execSync(`dfx canister uninstall-code calc || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy calc`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate calc`, {
        stdio: 'inherit'
    });
}

pretest();
