import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code timers || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy timers`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate timers`, {
        stdio: 'inherit'
    });
}

pretest();
