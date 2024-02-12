import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code evm_rpc || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code server || true`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx deploy --specified-id be2us-64aaa-aaaaa-qaabq-cai evm_rpc --argument '(record { nodesInSubnet = 28 })'`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx deploy server`, {
        stdio: 'inherit'
    });
}

pretest();
