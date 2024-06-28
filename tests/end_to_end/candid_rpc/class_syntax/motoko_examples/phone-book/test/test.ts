import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'phone-book_end_to_end_test_functional_syntax/test/tests';

import { createActor } from '../src/declarations/phone_book';

const phoneBookCanister = createActor(getCanisterId('phone_book'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(phoneBookCanister));
