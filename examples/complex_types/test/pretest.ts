import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code complex_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy complex_types`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate complex_types`, {
        stdio: 'inherit'
    });
}

pretest();
