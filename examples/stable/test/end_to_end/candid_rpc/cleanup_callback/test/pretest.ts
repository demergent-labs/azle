import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code cleanup_callback || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy cleanup_callback`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate cleanup_callback`, {
        stdio: 'inherit'
    });
}

pretest();
