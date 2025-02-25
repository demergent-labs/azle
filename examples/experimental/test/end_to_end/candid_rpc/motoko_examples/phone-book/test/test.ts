import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from '../src/declarations/phone_book';
import { getTests } from './tests';

const canisterName = 'phone_book';
const phoneBookCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(phoneBookCanister), canisterName);
