import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/generators';

const generators_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('generators'),
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
