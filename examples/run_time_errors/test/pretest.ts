import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code run_time_errors || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy run_time_errors`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate run_time_errors`, {
        stdio: 'inherit'
    });
}

pretest();
