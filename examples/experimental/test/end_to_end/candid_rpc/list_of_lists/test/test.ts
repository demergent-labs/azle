import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from '../dfx_generated/list_of_lists';
import { getTests } from './tests';

const canisterName = 'list_of_lists';
const listOfListsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(listOfListsCanister), canisterName);
