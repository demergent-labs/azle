import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code quicksort || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy quicksort`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate quicksort`, {
        stdio: 'inherit'
    });
}

pretest();
