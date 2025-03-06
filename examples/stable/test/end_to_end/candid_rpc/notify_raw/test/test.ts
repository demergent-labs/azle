import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'notify_raw_end_to_end_test_functional_syntax/test/tests';

import { createActor as createActorCanister1 } from './dfx_generated/canister1';
import { createActor as createActorCanister2 } from './dfx_generated/canister2';

const canister1Name = 'canister1';
const canister2Name = 'canister2';

const canister1 = createActorCanister1(getCanisterId(canister1Name), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

const canister2 = createActorCanister2(getCanisterId(canister2Name), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(canister1, canister2), [canister1Name, canister2Name]);
