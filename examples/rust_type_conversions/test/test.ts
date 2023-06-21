import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/rust_type_conversions';
import { getTests } from './tests';

const rustTypeConversionsCanister = createActor(
    getCanisterId('rust_type_conversions'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(rustTypeConversionsCanister));
