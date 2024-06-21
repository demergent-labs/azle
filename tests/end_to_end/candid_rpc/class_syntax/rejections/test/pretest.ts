import { getCanisterId } from 'azle/dfx';
import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code rejections || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code some_canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy some_canister`, {
        stdio: 'inherit'
    });

    execSync(
        `SOME_CANISTER_PRINCIPAL=${getCanisterId(
            'some_canister'
        )} dfx deploy rejections`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
