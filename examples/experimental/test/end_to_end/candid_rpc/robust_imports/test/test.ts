import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from '../dfx_generated/robust_imports';
import { getTests } from './tests';

const canisterName = 'robust_imports';
const robustImportsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(robustImportsCanister));
