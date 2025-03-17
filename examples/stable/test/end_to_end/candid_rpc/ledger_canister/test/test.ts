import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'ledger_canister_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/ledger_canister';

const canisterName = 'ledger_canister';
const ledgerCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

// TODO the as any can be removed once we get rid of the experimental APIs
// TODO and move the tests into ledger_canister
// TODO The error comes from generating the IDL types with the experimental canister APIs
// TODO which I assume are out of date or incompatible with the newest version of dfx 0.25.0
runTests(getTests(ledgerCanister as any));
