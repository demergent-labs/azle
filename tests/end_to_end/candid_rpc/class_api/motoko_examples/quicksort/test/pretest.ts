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
            'motoko_examples',
            'quicksort'
        )
    );

    execSync(`dfx canister uninstall-code quicksort || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy quicksort`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate quicksort`, {
        stdio: 'inherit'
    });
}

pretest();
