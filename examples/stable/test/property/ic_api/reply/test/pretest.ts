import { execSync } from 'child_process';

export function pretest(): void {
    execSync(`dfx canister uninstall-code canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy canister`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}
