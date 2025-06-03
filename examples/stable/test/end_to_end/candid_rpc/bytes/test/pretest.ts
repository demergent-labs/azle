import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code bytes_canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy bytes_canister`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate bytes_canister`, {
        stdio: 'inherit'
    });
}

pretest();
