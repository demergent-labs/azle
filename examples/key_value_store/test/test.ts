import { runTests } from 'azle/test';
import { createActor } from '../dfx_generated/azle';
import { getTests } from './tests';

const key_value_store_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(key_value_store_canister));
