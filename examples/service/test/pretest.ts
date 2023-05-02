import { execSync } from 'child_process';
import { getCanisterId } from 'azle/test';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code service || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code some_service || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create some_service || true`, {
        stdio: 'inherit'
    });

    execSync(
        `SOME_SERVICE_PRINCIPAL=${getCanisterId('some_service')} dfx deploy`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
