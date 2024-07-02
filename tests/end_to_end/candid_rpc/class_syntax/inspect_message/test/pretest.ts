import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'inspect_message'));

    execSync(`dfx canister uninstall-code inspect_message || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy inspect_message`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate inspect_message`, {
        stdio: 'inherit'
    });
}

pretest();
