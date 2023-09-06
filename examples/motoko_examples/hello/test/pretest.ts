import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code hello || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy hello`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate hello`, {
        stdio: 'inherit'
    });
}

pretest();
