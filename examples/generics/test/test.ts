import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { createActor } from './dfx_generated/generics';
import { getTests } from './tests';

// TODO is it time to get rid of this example?
const genericsCanister = createActor(getCanisterId('generics'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(genericsCanister));
