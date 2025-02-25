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
            'cycles'
        )
    );

    execSync(`dfx canister uninstall-code cycles || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code intermediary || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy cycles`, {
        stdio: 'inherit'
    });

    execSync(
        `CYCLES_PRINCIPAL=${getCanisterId('cycles')} dfx deploy intermediary`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
