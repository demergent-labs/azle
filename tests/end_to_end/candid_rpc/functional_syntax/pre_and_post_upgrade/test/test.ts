import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/pre_and_post_upgrade';
import { getTests } from './tests';

const canisterName = 'pre_and_post_upgrade';
const preAndPostUpgradeCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(preAndPostUpgradeCanister), canisterName);
