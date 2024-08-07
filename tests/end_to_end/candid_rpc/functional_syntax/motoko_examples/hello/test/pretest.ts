import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code hello || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy hello`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate hello`, {
        stdio: 'inherit'
    });
}

pretest();
