// TODO write tests for all ICRC functionality
// TODO test all errors for query blocks

import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/ledger_canister';
import { getTests } from './tests';

const ledgerCanister = createActor(getCanisterId('ledger_canister'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(ledgerCanister));
