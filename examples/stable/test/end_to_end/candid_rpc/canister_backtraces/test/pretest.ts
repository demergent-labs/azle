import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code canister_backtraces || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy canister_backtraces`, {
        stdio: 'inherit'
    });
}

pretest();
