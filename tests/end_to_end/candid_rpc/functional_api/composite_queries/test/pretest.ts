import { getCanisterId } from 'azle/dfx';
import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code canister1 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code canister2 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code canister3 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create canister1`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create canister2`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create canister3`, {
        stdio: 'inherit'
    });

    execSync(
        `CANISTER1_PRINCIPAL=${getCanisterId(
            'canister1'
        )} CANISTER2_PRINCIPAL=${getCanisterId(
            'canister2'
        )} CANISTER3_PRINCIPAL=${getCanisterId('canister3')} dfx deploy`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
