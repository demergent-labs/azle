import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/candid_encoding';
import { get_tests } from './tests';

const candid_encoding_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('candid_encoding'),
    ...get_tests(candid_encoding_canister)
];

run_tests(tests);
