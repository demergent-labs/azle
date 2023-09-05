import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code simple_to_do || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy simple_to_do`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate simple_to_do`, {
        stdio: 'inherit'
    });
}

pretest();
