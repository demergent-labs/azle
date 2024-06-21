import { execSync } from 'child_process';

async function pretest() {
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
