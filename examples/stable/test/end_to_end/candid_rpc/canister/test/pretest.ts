import { getCanisterId } from 'azle/_internal/dfx';
import { linkAndInstallPatch } from 'azle/_internal/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join(
            'examples',
            'experimental',
            'test',
            'end_to_end',
            'candid_rpc',
            'canister'
        )
    );

    execSync(`dfx canister uninstall-code canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code some_canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create some_canister || true`, {
        stdio: 'inherit'
    });

    execSync(
        `SOME_CANISTER_PRINCIPAL=${getCanisterId('some_canister')} dfx deploy`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
