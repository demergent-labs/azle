import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/hello_world';
import { getTests } from './tests';

const canisterName = 'hello_world';
const helloWorldCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

// TODO get rid of this cast to any once the dfx generate command uses @icp-sdk/core instead of the old @dfinity packages
runTests(getTests(helloWorldCanister as any));
