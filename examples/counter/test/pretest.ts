import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code counter || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy counter`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate counter`, {
        stdio: 'inherit'
    });
}

pretest();
