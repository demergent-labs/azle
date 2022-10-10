// TODO If we want these tests to be more exact, we can check balances and make sure they are within some margin of error

import { deploy, run_tests, Test } from 'azle/test';
import { createActor as createCyclesActor } from '../test/dfx_generated/cycles';
import { createActor as createIntermediaryActor } from '../test/dfx_generated/intermediary';
import { get_tests } from './tests';

const cycles_canister = createCyclesActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const intermediary_canister = createIntermediaryActor(
    'ryjl3-tyaaa-aaaaa-aaaba-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
    ...deploy('cycles'), // TODO for now these tests need to be run on a fresh dfx start --clean, since cycles are not discarded on uninstall-code
    ...deploy('intermediary'), // TODO for now these tests need to be run on a fresh dfx start --clean, since cycles are not discarded on uninstall-code
    ...get_tests(cycles_canister, intermediary_canister)
];

run_tests(tests);
