import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor as createActorCanister1 } from './dfx_generated/canister1';
import { createActor as createActorCanister2 } from './dfx_generated/canister2';
import { createActor as createActorCanister3 } from './dfx_generated/canister3';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/canister3/canister3.did';
import { getTests } from './tests';

const canister1Name = 'canister1';
const stableStructuresCanister_1 = createActorCanister1(
    getCanisterId(canister1Name),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const canister2Name = 'canister2';
const stableStructuresCanister_2 = createActorCanister2(
    getCanisterId(canister2Name),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const canister3Name = 'canister3';
const stableStructuresCanister_3 = createActorCanister3(
    getCanisterId(canister3Name),
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
    ),
    canister1Name
);
