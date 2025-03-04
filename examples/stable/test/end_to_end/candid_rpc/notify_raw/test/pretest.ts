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
            'notify_raw'
        )
    );

    execSync(`dfx canister uninstall-code canister1 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code canister2 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create canister2`, {
        stdio: 'inherit'
    });

    execSync(`CANISTER2_PRINCIPAL=${getCanisterId('canister2')} dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
