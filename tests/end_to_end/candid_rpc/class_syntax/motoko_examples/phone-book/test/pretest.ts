import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'phone-book'));

    execSync(`dfx canister uninstall-code phone_book || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy phone_book`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate phone_book`, {
        stdio: 'inherit'
    });
}

pretest();
