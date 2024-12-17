import { execSync } from 'child_process';

export function pretest(initArgs: string): void {
    execSync(`dfx canister uninstall-code canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy canister --argument '${initArgs}'`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate canister`, {
        stdio: 'inherit'
    });
}
