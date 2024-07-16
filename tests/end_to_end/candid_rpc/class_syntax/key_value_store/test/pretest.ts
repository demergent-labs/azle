import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join(
            'tests',
            'end_to_end',
            'candid_rpc',
            'functional_syntax',
            'key_value_store'
        )
    );

    execSync(`dfx canister uninstall-code key_value_store || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy key_value_store`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate key_value_store`, {
        stdio: 'inherit'
    });
}

pretest();
