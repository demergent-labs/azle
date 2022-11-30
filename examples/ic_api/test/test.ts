import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/ic_api';
import { get_tests } from './tests';

const ic_api_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('ic_api'),
    ...get_tests(ic_api_canister as any)
];

run_tests(tests);
