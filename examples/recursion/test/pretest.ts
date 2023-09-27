import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code recursion || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy recursion`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate recursion`, {
        stdio: 'inherit'
    });
}

pretest();
