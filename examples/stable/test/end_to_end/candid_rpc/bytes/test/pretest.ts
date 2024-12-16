import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join('tests', 'end_to_end', 'candid_rpc', 'functional_syntax', 'bytes')
    );

    execSync(`dfx canister uninstall-code bytes_canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy bytes_canister`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate bytes_canister`, {
        stdio: 'inherit'
    });
}

pretest();
