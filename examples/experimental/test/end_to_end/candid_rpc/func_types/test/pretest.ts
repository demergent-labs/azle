import { getCanisterId } from 'azle/_internal/dfx';
import { execSync } from 'child_process';

function pretest(): void {
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
