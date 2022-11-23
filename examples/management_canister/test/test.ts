import { deploy, run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/management_canister';
import { get_tests } from './tests';

const management_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('management_canister'),
    {
        name: 'add cycles',
        prep: async () => {
            execSync(
                `dfx ledger fabricate-cycles --canister management_canister --cycles 100000000000000`,
                {
                    stdio: 'inherit'
                }
            );
        }
    },
    ...get_tests(management_canister)
];

run_tests(tests);
