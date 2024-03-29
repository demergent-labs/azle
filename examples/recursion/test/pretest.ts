import { execSync } from 'child_process';
import { getCanisterId } from 'azle/dfx';

async function pretest() {
    execSync(`dfx canister uninstall-code recursive_canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy recursive_canister --argument '("hello")'`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate recursive_canister`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code recursion || true`, {
        stdio: 'inherit'
    });

    execSync(
        `MY_CANISTER_PRINCIPAL=${getCanisterId(
            'recursive_canister'
        )} dfx deploy recursion`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate recursion`, {
        stdio: 'inherit'
    });
}

pretest();
