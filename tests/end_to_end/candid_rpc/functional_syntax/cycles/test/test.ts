// TODO If we want these tests to be more exact, we can check balances and make sure they are within some margin of error

import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor as createCyclesActor } from './dfx_generated/cycles';
import { createActor as createIntermediaryActor } from './dfx_generated/intermediary';
import { getTests } from './tests';

const cyclesCanisterName = 'cycles';
const cyclesCanister = createCyclesActor(getCanisterId(cyclesCanisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const intermediaryCanisterName = 'intermediary';
const intermediaryCanister = createIntermediaryActor(
    getCanisterId(intermediaryCanisterName),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(cyclesCanister, intermediaryCanister), [
    cyclesCanisterName,
    intermediaryCanisterName
]);
