import { getCanisterId } from 'azle/test';
import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

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
