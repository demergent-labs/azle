import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'pre_and_post_upgrade_end_to_end_test_functional_api/test/tests';

import { createActor } from './dfx_generated/pre_and_post_upgrade';

const preAndPostUpgradeCanister = createActor(
    getCanisterId('pre_and_post_upgrade'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(preAndPostUpgradeCanister));
