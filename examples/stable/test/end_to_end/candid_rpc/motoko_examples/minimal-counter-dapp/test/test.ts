import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'minimal-counter-dapp_end_to_end_test_functional_syntax/test/tests';

// @ts-ignore
import { createActor } from '../src/declarations/minimal_dapp';

const canisterName = 'minimal_dapp';
const counterCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(counterCanister));
