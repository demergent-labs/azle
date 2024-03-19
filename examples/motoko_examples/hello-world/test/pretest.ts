import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code hello_world || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy hello_world`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate hello_world`, {
        stdio: 'inherit'
    });
}

pretest();
