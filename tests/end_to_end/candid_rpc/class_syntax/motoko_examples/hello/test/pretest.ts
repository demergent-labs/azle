import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'motoko_examples', 'hello'));

    execSync(`dfx canister uninstall-code hello || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy hello`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate hello`, {
        stdio: 'inherit'
    });
}

pretest();
