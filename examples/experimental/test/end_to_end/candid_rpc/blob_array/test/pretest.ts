import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code blob_array || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy blob_array`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate blob_array`, {
        stdio: 'inherit'
    });
}

pretest();
