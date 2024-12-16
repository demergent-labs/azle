import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code update || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy update`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate update`, {
        stdio: 'inherit'
    });
}

pretest();
