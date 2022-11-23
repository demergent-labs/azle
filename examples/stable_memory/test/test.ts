import { deploy, run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from './dfx_generated/stable_memory';
import { get_tests } from './tests';

const stable_memory_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('stable_memory'),
    {
        name: 'add cycles',
        prep: async () => {
            execSync(
                `dfx ledger fabricate-cycles --canister stable_memory --cycles 100000000000000`,
                {
                    stdio: 'inherit'
                }
            );
        }
    },
    ...get_tests(stable_memory_canister)
];

run_tests(tests);
