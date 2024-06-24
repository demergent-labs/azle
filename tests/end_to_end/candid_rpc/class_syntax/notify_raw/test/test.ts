import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor as createActorCanister1 } from './dfx_generated/canister1';
import { createActor as createActorCanister2 } from './dfx_generated/canister2';
import { getTests } from './tests';

const canister1 = createActorCanister1(getCanisterId('canister1'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const canister2 = createActorCanister2(getCanisterId('canister2'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(canister1, canister2));
