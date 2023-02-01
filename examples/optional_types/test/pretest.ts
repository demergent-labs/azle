import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code optional_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy optional_types`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate optional_types`, {
        stdio: 'inherit'
    });
}

pretest();
