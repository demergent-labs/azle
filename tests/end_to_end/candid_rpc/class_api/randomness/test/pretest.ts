import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join(
            'tests',
            'end_to_end',
            'candid_rpc',
            'functional_api',
            'randomness'
        )
    );

    execSync(`dfx canister uninstall-code randomness || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy randomness`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate randomness`, {
        stdio: 'inherit'
    });
}

pretest();
