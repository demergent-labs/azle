import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code randomness || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy randomness`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate randomness`, {
        stdio: 'inherit'
    });
}

pretest();
