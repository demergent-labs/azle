import { execSync } from 'child_process';

async function pretest() {
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
