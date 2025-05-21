import { execSync } from 'child_process';

function pretest(): void {
    // Uninstall existing code if any
    execSync(`dfx canister uninstall-code caller || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code callee || true`, {
        stdio: 'inherit'
    });

    // Deploy both canisters
    execSync(`dfx deploy caller`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy callee`, {
        stdio: 'inherit'
    });

    // Generate canister interfaces
    execSync(`dfx generate caller`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate callee`, {
        stdio: 'inherit'
    });
}

pretest();
