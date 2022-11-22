// TODO If we want these tests to be more exact, we can check balances and make sure they are within some margin of error

import { run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor as createCyclesActor } from './dfx_generated/cycles';
import { createActor as createIntermediaryActor } from './dfx_generated/intermediary';
import { get_tests } from './tests';

const cycles_canister = createCyclesActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const intermediary_canister = createIntermediaryActor(
    'ryjl3-tyaaa-aaaaa-aaaba-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
    // TODO for now these tests need to be run on a fresh dfx start --clean, since cycles are not discarded on uninstall-code
    {
        name: 'deploy',
        prep: async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000));

            execSync(`dfx canister uninstall-code cycles || true`, {
                stdio: 'inherit'
            });

            execSync(`dfx canister uninstall-code intermediary || true`, {
                stdio: 'inherit'
            });

            execSync(`dfx deploy`, {
                stdio: 'inherit'
            });
        }
    },
    ...get_tests(cycles_canister, intermediary_canister)
];

run_tests(tests);
