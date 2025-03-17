import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'phone-book_end_to_end_test_functional_syntax/test/tests';

import { createActor } from '../src/declarations/phone_book';

const canisterName = 'phone_book';
const phoneBookCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(phoneBookCanister));
