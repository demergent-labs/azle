import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

// @ts-ignore
import { createActor } from '../src/declarations/minimal_dapp';
import { getTests } from './tests';

const counterCanister = createActor(getCanisterId('minimal_dapp'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(counterCanister));
