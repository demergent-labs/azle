import { getCanisterId } from 'azle/dfx';
import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code cycles || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code intermediary || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy cycles`, {
        stdio: 'inherit'
    });

    execSync(
        `CYCLES_PRINCIPAL=${getCanisterId('cycles')} dfx deploy intermediary`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
