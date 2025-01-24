import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code hidden_methods || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy hidden_methods`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate hidden_methods`, {
        stdio: 'inherit'
    });
}

pretest();
