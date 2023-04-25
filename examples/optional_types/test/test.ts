import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/optional_types';
import { getTests } from './tests';

const optionalTypesCanister = createActor(getCanisterId('optional_types'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(optionalTypesCanister));
