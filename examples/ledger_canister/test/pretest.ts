import { execSync } from 'child_process';
import { getCanisterId } from 'azle/test';

async function pretest(icp_ledger_path: string) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code icp_ledger || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code ledger_canister || true`, {
        stdio: 'inherit'
    });

    execSync(`mkdir -p ${icp_ledger_path}`, {
        stdio: 'inherit'
    });

    execSync(
        `cd ${icp_ledger_path} && curl -o ledger.wasm.gz https://download.dfinity.systems/ic/d6d395a480cd6986b4788f4aafffc5c03a07e46e/canisters/ledger-canister_notify-method.wasm.gz`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`cd ${icp_ledger_path} && gunzip -f ledger.wasm.gz`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create ledger_canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create icp_ledger || true`, {
        stdio: 'inherit'
    });

    execSync(
        `ICP_CANISTER_PRINCIPAL=${getCanisterId(
            'icp_ledger'
        )} dfx deploy ledger_canister`,
        {
            stdio: 'inherit'
        }
    );

    execSync(
        `dfx deploy icp_ledger --argument='(record {minting_account = "'$(dfx ledger account-id)'"; initial_values = vec { record { "'$(dfx ledger account-id --of-canister ledger_canister)'"; record { e8s=100_000_000_000 } }; }; send_whitelist = vec {}})'`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate ledger_canister`, {
        stdio: 'inherit'
    });
}

pretest('src/icp_ledger');
