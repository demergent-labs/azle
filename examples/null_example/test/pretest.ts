import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code null_example || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy null_example`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate null_example`, {
        stdio: 'inherit'
    });
}

pretest();
