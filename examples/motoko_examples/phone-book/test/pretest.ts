import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code phone_book || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy phone_book`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate phone_book`, {
        stdio: 'inherit'
    });
}

pretest();
