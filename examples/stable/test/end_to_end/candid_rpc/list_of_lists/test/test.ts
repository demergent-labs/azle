import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'list_of_lists_end_to_end_test_functional_syntax/test/tests';

import { createActor } from '../dfx_generated/list_of_lists';

const canisterName = 'list_of_lists';
const listOfListsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(listOfListsCanister));
