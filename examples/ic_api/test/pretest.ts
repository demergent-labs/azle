import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code ic_api || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy ic_api`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate ic_api`, {
        stdio: 'inherit'
    });
}

pretest();
