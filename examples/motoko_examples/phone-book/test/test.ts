import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../src/declarations/phone_book';
import { getTests } from './tests';

const phoneBookCanister = createActor(getCanisterId('phone_book'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(phoneBookCanister));
