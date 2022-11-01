import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/simple_user_accounts/simple_user_accounts.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    simple_user_accounts_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'get_user_by_id',
            test: async () => {
                const result =
                    await simple_user_accounts_canister.get_user_by_id('0');

                return {
                    ok: result.length === 0
                };
            }
        },
        {
            name: 'get_all_users',
            test: async () => {
                const result =
                    await simple_user_accounts_canister.get_all_users();

                return {
                    ok: result.length === 0
                };
            }
        },
        {
            name: 'create_user',
            test: async () => {
                const result = await simple_user_accounts_canister.create_user(
                    'lastmjs'
                );

                return {
                    ok: result.id === '0' && result.username === 'lastmjs'
                };
            }
        },
        {
            name: 'get_user_by_id',
            test: async () => {
                const result =
                    await simple_user_accounts_canister.get_user_by_id('0');

                return {
                    ok:
                        result.length !== 0 &&
                        result[0].id === '0' &&
                        result[0].username === 'lastmjs'
                };
            }
        },
        {
            name: 'get_all_users',
            test: async () => {
                const result =
                    await simple_user_accounts_canister.get_all_users();

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
