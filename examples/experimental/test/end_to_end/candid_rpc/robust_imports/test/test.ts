import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from '../dfx_generated/robust_imports';
import { getTests } from './tests';

const canisterName = 'robust_imports';
const robustImportsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(robustImportsCanister), canisterName);
