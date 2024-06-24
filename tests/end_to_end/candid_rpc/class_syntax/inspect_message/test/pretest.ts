import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code inspect_message || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy inspect_message`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate inspect_message`, {
        stdio: 'inherit'
    });
}

pretest();
