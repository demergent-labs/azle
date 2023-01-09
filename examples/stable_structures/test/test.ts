import { deploy, run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from './dfx_generated/stable_structures';
import {
    get_pre_deploy_tests,
    get_post_deploy_tests,
    get_additional_tests
} from './tests';

const stable_structures_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('stable_structures'),
    ...get_pre_deploy_tests(stable_structures_canister),
    {
        name: 'redeploy stable_structures',
        prep: async () => {
            execSync('dfx deploy stable_structures', {
                stdio: 'inherit'
            });
        }
    },
    ...get_post_deploy_tests(stable_structures_canister),
    ...get_additional_tests(stable_structures_canister)
];

run_tests(tests);
