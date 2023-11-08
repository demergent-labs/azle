import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code stable_json || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy stable_json`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate stable_json`, {
        stdio: 'inherit'
    });
}

pretest();
