import {
    run_tests,
    Test
} from 'azle/test/new-test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/ledger_canister';

const ledger_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://localhost:8000'
        }
    }
);

const tests: Test[] = [
    {
        bash: `mkdir -p canisters/icp_ledger`
    },
    {
        bash: 'cd canisters/icp_ledger && curl -o ledger.wasm.gz https://download.dfinity.systems/ic/dfdba729414d3639b2a6c269600bbbd689b35385/canisters/ledger-canister_notify-method.wasm.gz'
    },
    {
        bash: 'cd canisters/icp_ledger && gunzip -f ledger.wasm.gz'
    },
    {
        bash: 'cd canisters/icp_ledger && curl -o ledger.private.did https://raw.githubusercontent.com/dfinity/ic/dfdba729414d3639b2a6c269600bbbd689b35385/rs/rosetta-api/ledger.did'
    },
    {
        bash: 'cd canisters/icp_ledger && curl -o ledger.public.did https://raw.githubusercontent.com/dfinity/ic/dfdba729414d3639b2a6c269600bbbd689b35385/rs/rosetta-api/ledger_canister/ledger.did'
    },
    {
        bash: 'dfx deploy ledger_canister'
    },
    {
        bash: 'dfx deploy icp_ledger --argument=\'(record {minting_account = "\'$(dfx ledger account-id)\'"; initial_values = vec { record { "\'$(dfx ledger account-id --of-canister ledger_canister)\'"; record { e8s=100_000_000_000 } }; }; send_whitelist = vec {}})\''
    },
    {
        bash: `dfx canister call ledger_canister get_account_balance '("\'$(dfx ledger account-id --of-canister ledger_canister)\'")'`,
        expectedOutputBash: `echo "(variant { ok = record { e8s = 100_000_000_000 : nat64 } })"`
    },
    {
        bash: `dfx canister call ledger_canister get_transfer_fee`,
        expectedOutputBash: `echo "(variant { ok = record { transfer_fee = record { e8s = 10_000 : nat64 } } })"`
    },
    {
        bash: `dfx canister call ledger_canister get_symbol`,
        expectedOutputBash: `echo "(variant { ok = \\"ICP\\" })"`
    },
    {
        bash: `dfx canister call ledger_canister get_name`,
        expectedOutputBash: `echo "(variant { ok = \\"Internet Computer\\" })"`
    },
    {
        bash: `dfx canister call ledger_canister get_decimals`,
        expectedOutputBash: `echo "(variant { ok = 8 : nat32 })"`
    },
    {
        bash: `dfx canister call ledger_canister get_archives`,
        expectedOutputBash: `echo "(variant { ok = record { archives = vec {} } })"`
    },
    {
        bash: `dfx canister call ledger_canister execute_transfer '("\'$(dfx ledger account-id --of-canister ledger_canister)\'", 1_000_000)'`
    },
    {
        bash: `dfx canister call ledger_canister get_account_balance '("\'$(dfx ledger account-id --of-canister ledger_canister)\'")'`,
        expectedOutputBash: `echo "(variant { ok = record { e8s = 99_999_990_000 : nat64 } })"`
    }
];

run_tests(tests);