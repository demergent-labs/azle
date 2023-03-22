import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code service || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy service`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate service`, {
        stdio: 'inherit'
    });
}

pretest();
