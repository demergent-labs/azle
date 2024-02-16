import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code autoreload || true`, {
        stdio: 'inherit'
    });

    execSync(`AZLE_AUTORELOAD=true dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
