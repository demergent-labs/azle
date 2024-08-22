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
            'functional_api',
            'rejections'
        )
    );

    execSync(`dfx canister uninstall-code rejections || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code some_canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy some_canister`, {
        stdio: 'inherit'
    });

    execSync(
        `SOME_CANISTER_PRINCIPAL=${getCanisterId(
            'some_canister'
        )} dfx deploy rejections`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
