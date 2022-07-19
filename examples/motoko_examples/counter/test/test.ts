import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/counter';

const counter_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('counter'),
    {
        name: 'get',
        test: async () => {
            const result = await counter_canister.get();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'get',
        test: async () => {
            const result = await counter_canister.set(10n);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'get',
        test: async () => {
            const result = await counter_canister.inc();

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'get',
        test: async () => {
            const result = await counter_canister.inc();

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'get',
        test: async () => {
            const result = await counter_canister.get();

            return {
                ok: result === 12n
            };
        }
    }
];

run_tests(tests);
