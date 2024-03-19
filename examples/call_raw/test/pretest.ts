import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code call_raw || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy call_raw`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate call_raw`, {
        stdio: 'inherit'
    });
}

pretest();
