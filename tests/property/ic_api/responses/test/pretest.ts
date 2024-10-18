import { getCanisterId } from 'azle/dfx';
import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code caller || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code rejector || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy rejector`, {
        stdio: 'inherit'
    });

    execSync(
        `REJECTOR_PRINCIPAL=${getCanisterId('rejector')} dfx deploy caller`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
