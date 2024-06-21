import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { createActor } from '../test/dfx_generated/imports';
import { getTests } from './tests';

const importsCanister = createActor(getCanisterId('imports'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(importsCanister));
