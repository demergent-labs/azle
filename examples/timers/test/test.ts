import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/timers';
import { get_tests } from './tests';

const timers_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [...deploy('timers'), ...get_tests(timers_canister)];

run_tests(tests);
