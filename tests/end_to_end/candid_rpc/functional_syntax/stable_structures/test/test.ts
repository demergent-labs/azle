import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor as createActorCanister1 } from './dfx_generated/canister1';
import { createActor as createActorCanister2 } from './dfx_generated/canister2';
import { createActor as createActorCanister3 } from './dfx_generated/canister3';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/canister3/canister3.did';
import { getTests } from './tests';

const stableStructuresCanister1Name = 'canister1';
const stableStructuresCanister1 = createActorCanister1(
    getCanisterId(stableStructuresCanister1Name),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const stableStructuresCanister2Name = 'canister2';
const stableStructuresCanister2 = createActorCanister2(
    getCanisterId(stableStructuresCanister2Name),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const stableStructuresCanister3Name = 'canister3';
const stableStructuresCanister3 = createActorCanister3(
    getCanisterId(stableStructuresCanister3Name),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(
    getTests(
        stableStructuresCanister1,
        stableStructuresCanister2,
        stableStructuresCanister3
    ),
    [
        stableStructuresCanister1Name,
        stableStructuresCanister2Name,
        stableStructuresCanister3Name
    ]
);
