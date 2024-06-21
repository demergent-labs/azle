import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'robust_imports_end_to_end_test_functional_syntax/test/tests';

import { createActor } from '../dfx_generated/robust_imports';

const robustImportsCanister = createActor(getCanisterId('robust_imports'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(robustImportsCanister));
