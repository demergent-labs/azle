import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code init || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy init`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate init`, {
        stdio: 'inherit'
    });
}

pretest();
