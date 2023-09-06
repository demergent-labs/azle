import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code query || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy query`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate query`, {
        stdio: 'inherit'
    });
}

pretest();
