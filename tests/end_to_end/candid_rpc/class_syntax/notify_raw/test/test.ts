import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'notify_raw_end_to_end_test_functional_syntax/test/tests';

import { createActor as createActorCanister1 } from './dfx_generated/canister1';
import { createActor as createActorCanister2 } from './dfx_generated/canister2';

const canister1Name = 'canister1';
const canister2Name = 'canister2';

const canister1 = createActorCanister1(getCanisterId(canister1Name), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const canister2 = createActorCanister2(getCanisterId(canister2Name), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(canister1, canister2), 'notify_raw');
