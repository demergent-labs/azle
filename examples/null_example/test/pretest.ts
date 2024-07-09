import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code null_example || true`, {
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
