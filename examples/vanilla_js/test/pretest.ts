import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code vanilla_js || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy vanilla_js`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate vanilla_js`, {
        stdio: 'inherit'
    });
}

pretest();
