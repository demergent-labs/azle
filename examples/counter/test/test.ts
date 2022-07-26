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
        name: 'readCount',
        test: async () => {
            const result = await counter_canister.readCount();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'readCount',
        test: async () => {
            const result = await counter_canister.incrementCount();

            return {
                ok: result === 1n
            };
        }
    },
    {
        name: 'readCount',
        test: async () => {
            const result = await counter_canister.incrementCount();

            return {
                ok: result === 2n
            };
        }
    },
    {
        name: 'readCount',
        test: async () => {
            const result = await counter_canister.incrementCount();

            return {
                ok: result === 3n
            };
        }
    },
    {
        name: 'readCount',
        test: async () => {
            const result = await counter_canister.readCount();

            return {
                ok: result === 3n
            };
        }
    }
];

run_tests(tests);
