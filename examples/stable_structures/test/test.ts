import { deploy, run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor as createActorCanister1 } from './dfx_generated/canister1';
import { createActor as createActorCanister2 } from './dfx_generated/canister2';
import {
    pre_redeploy_tests,
    post_redeploy_tests,
    insert_error_tests
} from './tests';

const stable_structures_canister_1 = createActorCanister1(
    'rrkah-fqaaa-aaaaa-aaaaq-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const stable_structures_canister_2 = createActorCanister2(
    'ryjl3-tyaaa-aaaaa-aaaba-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
    {
        name: 'deploy',
        prep: async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000));

            execSync(`dfx canister uninstall-code canister1 || true`, {
                stdio: 'inherit'
            });

            execSync(`dfx canister uninstall-code canister2 || true`, {
                stdio: 'inherit'
            });

            execSync(`dfx deploy`, {
                stdio: 'inherit'
            });
        }
    },
    ...pre_redeploy_tests(stable_structures_canister_1, 0, 6),
    ...pre_redeploy_tests(stable_structures_canister_2, 7, 13),
    {
        name: 'redeploy canisters',
        prep: async () => {
            execSync('dfx deploy', { stdio: 'inherit' });
        }
    },
    ...post_redeploy_tests(stable_structures_canister_1, 0, 6),
    ...post_redeploy_tests(stable_structures_canister_2, 7, 13),
    ...insert_error_tests(
        stable_structures_canister_1,
        stable_structures_canister_2
    )
];

run_tests(tests);
