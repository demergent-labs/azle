import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/management_canister';
import { getTests } from './tests';

const canisterName = 'management_canister';
const managementCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

// TODO the as any can be removed once we get rid of the experimental APIs
// TODO and move the tests into management_canister
// TODO The error comes from generating the IDL types with the experimental canister APIs
// TODO which I assume are out of date or incompatible with the newest version of dfx 0.25.0
runTests(getTests(managementCanister as any));
