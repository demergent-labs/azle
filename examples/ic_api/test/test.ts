import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/ic_api';
import { getTests } from './tests';

const ic_api_canister = createActor(getCanisterId('ic_api'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(ic_api_canister as any));
