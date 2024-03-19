import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code web_assembly || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
