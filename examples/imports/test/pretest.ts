import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code imports || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy imports`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate imports`, {
        stdio: 'inherit'
    });
}

pretest();
