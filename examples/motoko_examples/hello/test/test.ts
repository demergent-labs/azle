import { run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from './dfx_generated/hello';

const hello_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
    },
});

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code hello || true`, {
                stdio: 'inherit',
            });
        },
    },
    {
        // TODO hopefully we can get rid of this: https://forum.dfinity.org/t/generated-declarations-in-node-js-environment-break/12686/16?u=lastmjs
        name: 'waiting for createActor fetchRootKey',
        wait: 5000,
    },
    {
        name: 'deploy',
        prep: async () => {
            execSync(`dfx deploy`, {
                stdio: 'inherit',
            });
        },
    },
    {
        name: 'greet',
        test: async () => {
            const result = await hello_canister.greet('everyone');

            return {
                ok: result === 'Hello, everyone!',
            };
        },
    },
    {
        name: 'greet nobody',
        test: async () => {
            const result = await hello_canister.greet('');

            return {
                ok: result === 'Hello, !',
            };
        },
    },
];

run_tests(tests);
