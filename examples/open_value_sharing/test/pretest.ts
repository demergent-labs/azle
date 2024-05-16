import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code open_value_sharing || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
