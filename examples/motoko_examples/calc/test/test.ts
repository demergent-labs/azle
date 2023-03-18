import { run_tests } from 'azle/test';
import { createActor } from '../dfx_generated/azle';
import { getTests } from './tests';

const calc_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_tests(getTests(calc_canister));
