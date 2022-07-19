// TODO this needs to be more thoroughly tested

import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/complex_types';

const complex_types_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('complex_types'),
    {
        name: 'getAllUsers',
        test: async () => {
            const result = await complex_types_canister.getAllUsers(0);

            return {
                ok: result.length === 0
            };
        }
    },
    {
        name: 'createUser',
        test: async () => {
            const result = await complex_types_canister.createUser('user1', 0);

            return {
                ok:
                    result.id === '0' &&
                    result.username === 'user1' &&
                    result.threads.length === 0 &&
                    result.posts.length === 0 &&
                    result.reactions.length === 0
            };
        }
    },
    {
        name: 'getAllUsers',
        test: async () => {
            const result = await complex_types_canister.getAllUsers(0);

            return {
                ok:
                    result.length === 1 &&
                    result[0].id === '0' &&
                    result[0].username === 'user1' &&
                    result[0].threads.length === 0 &&
                    result[0].posts.length === 0 &&
                    result[0].reactions.length === 0
            };
        }
    }
];

run_tests(tests);
