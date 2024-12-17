import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/null_example';
import { getTests } from './tests';

const canisterName = 'null_example';
const nullExampleCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(nullExampleCanister), canisterName);
