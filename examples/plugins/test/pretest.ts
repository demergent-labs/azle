import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code plugins || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy plugins`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate plugins`, {
        stdio: 'inherit'
    });
}

pretest();
