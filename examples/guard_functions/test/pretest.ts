import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code guard_functions || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
