import { getCanisterId } from 'azle/dfx';
import { execSync } from 'child_process';

async function pretest() {
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
