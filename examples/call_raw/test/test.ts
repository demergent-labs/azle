import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/call_raw';
import { get_tests } from './tests';

const call_raw_canister = createActor(getCanisterId('call_raw'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(call_raw_canister));
