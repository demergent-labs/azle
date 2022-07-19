import { cleanDeploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/minimal_dapp';

const counter_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...cleanDeploy('minimal_dapp'),
    {
        name: 'init get count',
        test: async () => {
            const result = await counter_canister.getCount();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'first increment',
        test: async () => {
            const result = await counter_canister.count();

            return {
                ok: result === 1n
            };
        }
    },
    {
        name: 'second increment',
        test: async () => {
            const result = await counter_canister.count();

            return {
                ok: result === 2n
            };
        }
    },
    {
        name: 'get count',
        test: async () => {
            const result = await counter_canister.getCount();

            return {
                ok: result === 2n
            };
        }
    },
    {
        name: 'reset',
        test: async () => {
            const result = await counter_canister.reset();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'get count after reset',
        test: async () => {
            const result = await counter_canister.getCount();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'increment after reset',
        test: async () => {
            const result = await counter_canister.count();

            return {
                ok: result === 1n
            };
        }
    },
    {
        name: 'get count after first increment after reset',
        test: async () => {
            const result = await counter_canister.getCount();

            return {
                ok: result === 1n
            };
        }
    }
];

run_tests(tests);
