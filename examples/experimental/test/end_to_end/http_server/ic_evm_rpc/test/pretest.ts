import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code evm_rpc || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code server || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
