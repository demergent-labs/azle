import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../dfx_generated/azle';
import { getTests } from './tests';

const key_value_store_canister = createActor(getCanisterId('azle'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(key_value_store_canister));
