import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code candid_keywords || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy candid_keywords`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate candid_keywords`, {
        stdio: 'inherit'
    });
}

pretest();
