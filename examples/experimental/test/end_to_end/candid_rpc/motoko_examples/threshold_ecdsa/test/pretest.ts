import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code threshold_ecdsa || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy threshold_ecdsa`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate threshold_ecdsa`, {
        stdio: 'inherit'
    });
}

pretest();
