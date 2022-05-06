import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/simple_user_accounts';

const simple_user_accounts_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code simple_user_accounts || true`, {
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
            const result = await simple_user_accounts_canister.createUser('lastmjs');

            return {
                ok: (
                    result.id === '0' &&
                    result.username === 'lastmjs'
                )
            };
        }
    },
    {
        name: 'getUserById',
        test: async () => {
            const result = await simple_user_accounts_canister.getUserById('0');

            return {
                ok: (
                    result.length !== 0 &&
                    result[0].id === '0' &&
                    result[0].username === 'lastmjs'
                )
            };
        }
    },
    {
        name: 'getAllUsers',
        test: async () => {
            const result = await simple_user_accounts_canister.getAllUsers();

            return {
                ok: (
                    result.length === 1 &&
                    result[0].id === '0' &&
                    result[0].username === 'lastmjs'
                )
            };
        }
    }
];

run_tests(tests);