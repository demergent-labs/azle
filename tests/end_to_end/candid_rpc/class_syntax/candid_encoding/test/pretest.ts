import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code candid_encoding || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy candid_encoding`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate candid_encoding`, {
        stdio: 'inherit'
    });
}

pretest();
