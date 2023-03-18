import { run_tests } from 'azle/test';
import { createActor } from '../dfx_generated/list_of_lists';
import { getTests } from './tests';

const list_of_lists_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_tests(getTests(list_of_lists_canister));
