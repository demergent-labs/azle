import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/candid_encoding';
import { get_tests } from './tests';

const candidEncodingCanister = createActor(getCanisterId('candid_encoding'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(candidEncodingCanister));
