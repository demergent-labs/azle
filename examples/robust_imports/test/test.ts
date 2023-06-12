import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../dfx_generated/robust_imports';
import { getTests } from './tests';

const robustImportsCanister = createActor(getCanisterId('robust_imports'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(robustImportsCanister));
