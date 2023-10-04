import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code update || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy update`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate update`, {
        stdio: 'inherit'
    });
}

pretest();
