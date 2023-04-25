import { getCanisterId, runTests } from 'azle/test';
import { createActor as createActorCanister1 } from './dfx_generated/canister1';
import { createActor as createActorCanister2 } from './dfx_generated/canister2';
import { createActor as createActorCanister3 } from './dfx_generated/canister3';
import { _SERVICE } from './dfx_generated/canister3/canister3.did';
import { getTests } from './tests';

const stableStructuresCanister_1 = createActorCanister1(
    getCanisterId('canister1'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const stableStructuresCanister_2 = createActorCanister2(
    getCanisterId('canister2'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);
const stableStructuresCanister_3 = createActorCanister3(
    getCanisterId('canister3'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(
    getTests(
        stableStructuresCanister_1,
        stableStructuresCanister_2,
        stableStructuresCanister_3
    )
);
