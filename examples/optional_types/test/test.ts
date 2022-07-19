import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/optional_types';

const optional_types_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('optional_types'),
    {
        name: 'getHTML',
        test: async () => {
            const result = await optional_types_canister.getHTML();

            return {
                ok: result.head.length === 0
            };
        }
    },
    {
        name: 'getHead',
        test: async () => {
            const result = await optional_types_canister.getHead();

            return {
                ok: result.length === 1 && result[0].elements.length === 0
            };
        }
    },
    {
        name: 'getHeadWithElements',
        test: async () => {
            const result = await optional_types_canister.getHeadWithElements();

            return {
                ok:
                    result.length === 1 &&
                    result[0].elements.length === 1 &&
                    result[0].elements[0].id === '0'
            };
        }
    },
    {
        name: 'getElement',
        test: async () => {
            const result = await optional_types_canister.getElement([]);

            return {
                ok: result.length === 0
            };
        }
    },
    {
        name: 'getElement',
        test: async () => {
            const result = await optional_types_canister.getElement([[]]);

            return {
                ok: result.length === 0
            };
        }
    },
    {
        name: 'getElement',
        test: async () => {
            const result = await optional_types_canister.getElement([
                [{ id: '0' }]
            ]);

            return {
                ok:
                    result.length === 1 &&
                    result[0].length === 1 &&
                    result[0][0].id === '0'
            };
        }
    }
];

run_tests(tests);
