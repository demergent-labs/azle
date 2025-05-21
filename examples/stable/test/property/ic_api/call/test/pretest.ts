import { execSync } from 'child_process';

function pretest(): void {
    // Uninstall existing code if any
    execSync(`dfx canister uninstall-code call || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code callee || true`, {
        stdio: 'inherit'
    });

    // Deploy both canisters
    execSync(`dfx deploy call`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy callee`, {
        stdio: 'inherit'
    });

    // Generate canister interfaces
    execSync(`dfx generate call`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate callee`, {
        stdio: 'inherit'
    });
}

pretest();
