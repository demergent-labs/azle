import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code api || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
