import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code manual_reply || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy manual_reply`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate manual_reply`, {
        stdio: 'inherit'
    });
}

pretest();
