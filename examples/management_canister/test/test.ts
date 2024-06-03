import { getCanisterId } from 'azle/dfx';
import { describe } from 'azle/test/jest';

import { createActor } from '../test/dfx_generated/management_canister';
import { getTests } from './tests';

const managementCanister = createActor(getCanisterId('management_canister'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

describe('Azle management_canister tests', getTests(managementCanister));
