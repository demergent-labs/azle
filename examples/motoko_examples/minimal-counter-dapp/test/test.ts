import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../src/declarations/minimal_dapp';
import { getTests } from './tests';

const counterCanister = createActor(getCanisterId('minimal_dapp'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(counterCanister));
