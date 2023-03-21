import { runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/pre_and_post_upgrade';
import { getTests } from './tests';

const preAndPostUpgradeCanister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(preAndPostUpgradeCanister));
