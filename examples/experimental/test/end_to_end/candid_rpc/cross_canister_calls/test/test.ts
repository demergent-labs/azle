import { ActorSubclass } from '@dfinity/agent';
import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor as createActorCanister1 } from './dfx_generated/canister1';
import { _SERVICE as CANISTER1_SERVICE } from './dfx_generated/canister1/canister1.did';
import { createActor as createActorCanister2 } from './dfx_generated/canister2';
import { _SERVICE as CANISTER2_SERVICE } from './dfx_generated/canister2/canister2.did';
import { getTests } from './tests';

const canister1Name = 'canister1';
const canister2Name = 'canister2';

const createActors = {
    canister1: async (): Promise<ActorSubclass<CANISTER1_SERVICE>> =>
        createActorCanister1(getCanisterId(canister1Name), {
            agentOptions: {
                host: 'http://127.0.0.1:8000'
            }
        }),
    canister2: async (): Promise<ActorSubclass<CANISTER2_SERVICE>> =>
        createActorCanister2(getCanisterId(canister2Name), {
            agentOptions: {
                host: 'http://127.0.0.1:8000'
            }
        })
};

runTests(getTests(), createActors, [canister1Name, canister2Name]);
