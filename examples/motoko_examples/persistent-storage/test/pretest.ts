import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code persistent_storage || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy persistent_storage`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate persistent_storage`, {
        stdio: 'inherit'
    });
}

pretest();
