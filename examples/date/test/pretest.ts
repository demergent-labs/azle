import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code date || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy date`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate date`, {
        stdio: 'inherit'
    });
}

pretest();
