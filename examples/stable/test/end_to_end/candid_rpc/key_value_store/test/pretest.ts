import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code key_value_store || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy key_value_store`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate key_value_store`, {
        stdio: 'inherit'
    });
}

pretest();
