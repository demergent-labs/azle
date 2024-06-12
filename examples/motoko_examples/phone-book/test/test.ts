import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { createActor } from '../src/declarations/phone_book';
import { getTests } from './tests';

const canisterName = 'phone_book';

const phoneBookCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(canisterName, getTests(phoneBookCanister));
