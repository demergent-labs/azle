import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(join('examples', 'query'));

    execSync(`dfx canister uninstall-code query || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy query`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate query`, {
        stdio: 'inherit'
    });
}

pretest();
