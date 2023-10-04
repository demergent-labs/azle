import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../dfx_generated/list_of_lists';
import { getTests } from './tests';

const listOfListsCanister = createActor(getCanisterId('list_of_lists'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(listOfListsCanister));
