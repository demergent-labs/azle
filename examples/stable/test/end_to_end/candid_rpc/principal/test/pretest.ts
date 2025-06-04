import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code principal || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy principal`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate principal`, {
        stdio: 'inherit'
    });
}

pretest();
