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
            'counter'
        )
    );

    execSync(`dfx canister uninstall-code counter || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy counter`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate counter`, {
        stdio: 'inherit'
    });
}

pretest();
