import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/tuple_types';
import { getTests } from './tests';

const tupleTypesCanister = createActor(getCanisterId('tuple_types'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(tupleTypesCanister));
