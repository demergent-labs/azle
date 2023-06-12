import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

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
