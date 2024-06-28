import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'hello-world_end_to_end_test_functional_syntax/test/tests';

// @ts-ignore
import { createActor } from './dfx_generated/hello_world';

const helloWorldCanister = createActor(getCanisterId('hello_world'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(helloWorldCanister));
