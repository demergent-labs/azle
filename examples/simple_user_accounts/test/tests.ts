import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/simple_user_accounts/simple_user_accounts.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(
    simpleUserAccountsCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'getUserById',
            test: async () => {
                const result = await simpleUserAccountsCanister.getUserById(
                    '0'
                );

                return {
                    Ok: result.length === 0
                };
            }
        },
        {
            name: 'getAllUsers',
            test: async () => {
                const result = await simpleUserAccountsCanister.getAllUsers();

                return {
                    Ok: result.length === 0
                };
            }
        },
        {
            name: 'createUser',
            test: async () => {
                const result = await simpleUserAccountsCanister.createUser(
                    'lastmjs'
                );

                return {
                    Ok: result.id === '0' && result.username === 'lastmjs'
                };
            }
        },
        {
            name: 'getUserById',
            test: async () => {
                const result = await simpleUserAccountsCanister.getUserById(
                    '0'
                );

                return {
                    Ok:
                        result.length !== 0 &&
                        result[0].id === '0' &&
                        result[0].username === 'lastmjs'
                };
            }
        },
        {
            name: 'getAllUsers',
            test: async () => {
                const result = await simpleUserAccountsCanister.getAllUsers();

                return {
                    Ok:
                        result.length === 1 &&
                        result[0].id === '0' &&
                        result[0].username === 'lastmjs'
                };
            }
        }
    ];
}
