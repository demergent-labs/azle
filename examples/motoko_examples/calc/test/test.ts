import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../dfx_generated/azle';

const calc_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('azle'),
    {
        name: 'add 5',
        test: async () => {
            const result = await calc_canister.add(5n);

            return {
                ok: result === 5n
            };
        }
    },
    {
        name: 'sub 2',
        test: async () => {
            const result = await calc_canister.sub(2n);

            return {
                ok: result === 3n
            };
        }
    },
    {
        name: 'mul 6',
        test: async () => {
            const result = await calc_canister.mul(6n);

            return {
                ok: result === 18n
            };
        }
    },
    {
        name: 'div 2',
        test: async () => {
            const result = await calc_canister.div(2n);

            return {
                ok: result.length === 1 && result[0] === 9n
            };
        }
    },
    {
        name: 'clearall',
        test: async () => {
            const result = await calc_canister.clearall();

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'add 0',
        test: async () => {
            const result = await calc_canister.add(0n);

            return {
                ok: result === 0n
            };
        }
    }
];

run_tests(tests);
