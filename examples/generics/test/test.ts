import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { createActor } from './dfx_generated/generics';
import { getTests } from './tests';

// TODO is it time to get rid of this example?
const canisterName = 'generics';

const genericsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(canisterName, getTests(genericsCanister));
