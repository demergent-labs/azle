import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

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
