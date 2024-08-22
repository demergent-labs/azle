import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join('tests', 'end_to_end', 'candid_rpc', 'functional_api', 'update')
    );

    execSync(`dfx canister uninstall-code update || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy update`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate update`, {
        stdio: 'inherit'
    });
}

pretest();
