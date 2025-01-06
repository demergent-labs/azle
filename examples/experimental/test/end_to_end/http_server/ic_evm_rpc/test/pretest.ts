import { execSync } from 'child_process';

function pretest(): void {
    execSync(
        `mkdir -p src/candid && curl -L https://github.com/dfinity/evm-rpc-canister/releases/latest/download/evm_rpc.did -o src/candid/evm_rpc.did`,
        { stdio: 'inherit' }
    );

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
