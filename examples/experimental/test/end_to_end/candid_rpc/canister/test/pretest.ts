import { getCanisterId } from 'azle/dfx';
import { execSync } from 'child_process';

function pretest(): void {
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
