import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'simple-to-do_end_to_end_test_functional_syntax/test/tests';

// @ts-ignore
import { createActor } from './dfx_generated/simple_to_do';

const canisterName = 'simple_to_do';
const todoCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(todoCanister));
