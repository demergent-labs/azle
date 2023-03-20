import { runTests } from 'azle/test';
import { createActor } from './dfx_generated/func_types';
import { getTests } from './tests';

const func_types_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(func_types_canister));
