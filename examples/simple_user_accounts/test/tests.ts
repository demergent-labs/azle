import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/simple_user_accounts/simple_user_accounts.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    simple_user_accounts_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'getUserById',
            test: async () => {
                const result = await simple_user_accounts_canister.getUserById(
                    '0'
                );

                return {
                    ok: result.length === 0
                };
            }
        },
        {
            name: 'getAllUsers',
            test: async () => {
                const result =
                    await simple_user_accounts_canister.getAllUsers();

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
                const result = await simple_user_accounts_canister.getUserById(
                    '0'
                );

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
                const result =
                    await simple_user_accounts_canister.getAllUsers();

                return {
                    ok:
                        result.length === 1 &&
                        result[0].id === '0' &&
                        result[0].username === 'lastmjs'
                };
            }
        }
    ];
}
