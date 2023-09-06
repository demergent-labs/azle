import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code threshold_ecdsa || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy threshold_ecdsa`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate threshold_ecdsa`, {
        stdio: 'inherit'
    });
}

pretest();
