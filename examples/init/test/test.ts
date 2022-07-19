import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/init';

const init_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy(
        'init',
        `'(record { id = "0" }, variant { Fire }, principal "rrkah-fqaaa-aaaaa-aaaaq-cai")'`
    ),
    {
        name: 'getUser',
        test: async () => {
            const result = await init_canister.getUser();

            return {
                ok: result.length === 1 && result[0].id === '0'
            };
        }
    },
    {
        name: 'getReaction',
        test: async () => {
            const result = await init_canister.getReaction();

            return {
                ok: result.length === 1 && 'Fire' in result[0]
            };
        }
    },
    {
        name: 'getOwner',
        test: async () => {
            const result = await init_canister.getOwner();

            return {
                ok:
                    result.length === 1 &&
                    result[0].toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
            };
        }
    }
];

run_tests(tests);
