import { getCanisterId } from 'azle/test';
import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code cycles || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code intermediary || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create cycles`, {
        stdio: 'inherit'
    });

    execSync(`CYCLES_PRINCIPAL=${getCanisterId('cycles')} dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
