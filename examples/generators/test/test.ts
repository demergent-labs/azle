import { run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/generators';

const generators_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code generators || true`, {
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
        name: 'get_randomness_directly',
        test: async () => {
            const result = await generators_canister.get_randomness_directly();

            return {
                ok: result.length === 32
            };
        }
    },
    {
        name: 'get_randomness_indirectly',
        test: async () => {
            const result =
                await generators_canister.get_randomness_indirectly();

            return {
                ok: result.length === 32
            };
        }
    },
    {
        name: 'get_randomness_super_indirectly',
        test: async () => {
            const result =
                await generators_canister.get_randomness_super_indirectly();

            return {
                ok: result.length === 96
            };
        }
    }
];

run_tests(tests);
