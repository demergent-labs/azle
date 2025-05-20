import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy canister`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate canister`, {
        stdio: 'inherit'
    });
}

pretest();
