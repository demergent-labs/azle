import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code http_counter || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy http_counter`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate http_counter`, {
        stdio: 'inherit'
    });
}

pretest();
