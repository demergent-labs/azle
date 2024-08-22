import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'minimal-counter-dapp_end_to_end_test_functional_api/test/tests';

// @ts-ignore
import { createActor } from '../src/declarations/minimal_dapp';

const counterCanister = createActor(getCanisterId('minimal_dapp'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(counterCanister));
