import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code minimal_dapp || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy minimal_dapp`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate minimal_dapp`, {
        stdio: 'inherit'
    });
}

pretest();
