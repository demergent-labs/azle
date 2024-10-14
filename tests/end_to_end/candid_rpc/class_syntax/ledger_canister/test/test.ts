// TODO write tests for all ICRC functionality
// TODO test all errors for query blocks

import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'ledger_canister_end_to_end_test_functional_syntax/test/tests';

import { createActor } from '../test/dfx_generated/ledger_canister';

const canisterName = 'ledger_canister';
const ledgerCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(ledgerCanister), canisterName);
