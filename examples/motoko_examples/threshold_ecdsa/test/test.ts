import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/threshold_ecdsa/';
import { getTests } from './tests';

const tEcdsaCanister = createActor(getCanisterId('threshold_ecdsa'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

// TODO currently the replica take 5-10 minutes before it is ready to process
// any tecdsa requests, so we are skipping these tests until we can think of
// an elegant way to run these tests only after the replica is ready to process
// them, when we are no longer skipping the tests we can remove the dummy test
runTests(getTests(tEcdsaCanister));
