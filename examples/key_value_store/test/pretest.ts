import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code azle || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy azle`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate azle`, {
        stdio: 'inherit'
    });
}

pretest();
