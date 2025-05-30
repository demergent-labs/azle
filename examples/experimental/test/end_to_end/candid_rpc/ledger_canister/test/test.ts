// TODO write tests for all ICRC functionality
// TODO test all errors for query blocks

import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/ledger_canister';
import { getTests } from './tests';

const canisterName = 'ledger_canister';
const ledgerCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(ledgerCanister));
