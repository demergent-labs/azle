import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code echo || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy echo`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate echo`, {
        stdio: 'inherit'
    });
}

pretest();
