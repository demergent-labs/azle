import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code counter || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy counter`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate counter`, {
        stdio: 'inherit'
    });
}

pretest();
