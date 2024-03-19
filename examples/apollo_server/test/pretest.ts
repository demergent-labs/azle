import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code apollo_server || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
