import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code caller || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code callee || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy caller`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy callee`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate caller`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate callee`, {
        stdio: 'inherit'
    });
}

pretest();
