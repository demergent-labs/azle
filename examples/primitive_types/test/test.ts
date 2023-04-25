import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/primitive_types';
import { getTests } from './tests';

const primitiveTypesCanister = createActor(getCanisterId('primitive_types'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(primitiveTypesCanister));
