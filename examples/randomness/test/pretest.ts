import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code randomness || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy randomness`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate randomness`, {
        stdio: 'inherit'
    });
}

pretest();
