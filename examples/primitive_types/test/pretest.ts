import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code primitive_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy primitive_types`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate primitive_types`, {
        stdio: 'inherit'
    });
}

pretest();
