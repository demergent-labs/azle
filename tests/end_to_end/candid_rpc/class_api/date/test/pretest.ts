import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join('tests', 'end_to_end', 'candid_rpc', 'functional_api', 'date')
    );

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
