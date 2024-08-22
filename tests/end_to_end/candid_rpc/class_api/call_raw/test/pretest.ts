import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join('tests', 'end_to_end', 'candid_rpc', 'functional_api', 'call_raw')
    );

    execSync(`dfx canister uninstall-code call_raw || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy call_raw`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate call_raw`, {
        stdio: 'inherit'
    });
}

pretest();
