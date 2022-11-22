import { run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from './dfx_generated/rejections';
import { get_tests } from './tests';

const rejections_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    {
        name: 'deploy',
        prep: async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000));

            execSync(`dfx canister uninstall-code rejections || true`, {
                stdio: 'inherit'
            });

            execSync(`dfx canister uninstall-code some_service || true`, {
                stdio: 'inherit'
            });

            execSync(`dfx deploy`, {
                stdio: 'inherit'
            });
        }
    },
    ...get_tests(rejections_canister)
];

run_tests(tests);
