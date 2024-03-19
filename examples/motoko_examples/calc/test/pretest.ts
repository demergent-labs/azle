import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code calc || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy calc`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate calc`, {
        stdio: 'inherit'
    });
}

pretest();
