import { run_tests } from 'azle/test';
import { createActor } from '../dfx_generated/list_of_lists';
import { get_tests } from './tests';

const list_of_lists_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_tests(get_tests(list_of_lists_canister));
