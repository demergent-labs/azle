import { getCanisterId } from 'azle/dfx';
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
            'func_types'
        )
    );

    execSync(`dfx canister uninstall-code func_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code notifiers || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create notifiers || true`, {
        stdio: 'inherit'
    });

    execSync(`NOTIFIERS_PRINCIPAL=${getCanisterId('notifiers')} dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
