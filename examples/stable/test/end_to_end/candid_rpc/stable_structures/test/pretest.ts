import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code canister1 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code canister2 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code canister3 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
