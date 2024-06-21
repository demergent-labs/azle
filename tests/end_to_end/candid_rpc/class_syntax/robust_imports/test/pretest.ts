import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'robust_imports'));

    execSync(`dfx canister uninstall-code robust_imports || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy robust_imports`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate robust_imports`, {
        stdio: 'inherit'
    });
}

pretest();
