import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code robust_imports || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy robust_imports`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate robust_imports`, {
        stdio: 'inherit'
    });
}

pretest();
