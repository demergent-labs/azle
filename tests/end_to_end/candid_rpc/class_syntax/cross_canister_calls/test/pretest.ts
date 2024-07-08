import { getCanisterId } from 'azle/dfx';
import { execSync } from 'child_process';

async function pretest() {
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
