import { execSync } from 'child_process';

async function pretest() {
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
