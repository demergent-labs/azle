// TODO write tests for all ICRC functionality
// TODO test all errors for query blocks

import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/ledger_canister';
import { getTests } from './tests';

const canisterName = 'ledger_canister';
const ledgerCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(ledgerCanister), canisterName);
