import { run_tests } from 'azle/test';
import { createActor } from './dfx_generated/stable_memory';
import { get_tests } from './tests';

const stable_memory_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_tests(get_tests(stable_memory_canister));
