import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code event_loop || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code mock || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate event_loop`, {
        stdio: 'inherit'
    });
}

pretest();
