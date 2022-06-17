import { run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from './dfx_generated/inspect_message';

const inspect_message_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code inspect_message || true`, {
                stdio: 'inherit'
            });
        }
    },
    {
        // TODO hopefully we can get rid of this: https://forum.dfinity.org/t/generated-declarations-in-node-js-environment-break/12686/16?u=lastmjs
        name: 'waiting for createActor fetchRootKey',
        wait: 5000
    },
    {
        name: 'deploy',
        prep: async () => {
            execSync(`dfx deploy`, {
                stdio: 'inherit'
            });
        }
    },
    {
        name: 'getInitialized',
        test: async () => {
            try {
                const result = await inspect_message_canister.getInitialized();
                return {
                    ok: false
                };
            } catch (error) {
                return {
                    ok: ((error as any).message as string).includes('Code: 403')
                };
            }
        }
    }
];

run_tests(tests);
