import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/simple_user_accounts';

const simple_user_accounts_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
    ...deploy('simple_user_accounts'),
    {
        name: 'getUserById',
        test: async () => {
            const result = await simple_user_accounts_canister.getUserById('0');

            return {
                ok: result.length === 0
            };
        }
    },
    {
        name: 'getAllUsers',
        test: async () => {
            const result = await simple_user_accounts_canister.getAllUsers();

            return {
                ok: result.length === 0
            };
        }
    },
    {
        name: 'createUser',
        test: async () => {
            const result = await simple_user_accounts_canister.createUser(
                'lastmjs'
            );

            return {
                ok: result.id === '0' && result.username === 'lastmjs'
            };
        }
    },
    {
        name: 'getUserById',
        test: async () => {
            const result = await simple_user_accounts_canister.getUserById('0');

            return {
                ok:
                    result.length !== 0 &&
                    result[0].id === '0' &&
                    result[0].username === 'lastmjs'
            };
        }
    },
    {
        name: 'getAllUsers',
        test: async () => {
            const result = await simple_user_accounts_canister.getAllUsers();

            return {
                ok:
                    result.length === 1 &&
                    result[0].id === '0' &&
                    result[0].username === 'lastmjs'
            };
        }
    }
];

run_tests(tests);
