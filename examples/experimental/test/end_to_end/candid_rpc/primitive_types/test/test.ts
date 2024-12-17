import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/primitive_types';
import { getTests } from './tests';

const canisterName = 'primitive_types';
const primitiveTypesCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(primitiveTypesCanister), canisterName);
