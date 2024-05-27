import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/simple_user_accounts/simple_user_accounts.did';

export function getTests(
    simpleUserAccountsCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'getUserById',
            test: async () => {
                const result =
                    await simpleUserAccountsCanister.getUserById('0');

                return testEquality(result.length, 0);
            }
        },
        {
            name: 'getAllUsers',
            test: async () => {
                const result = await simpleUserAccountsCanister.getAllUsers();

                return testEquality(result.length, 0);
            }
        },
        {
            name: 'createUser',
            test: async () => {
                const result =
                    await simpleUserAccountsCanister.createUser('lastmjs');
                const expected = { id: '0', username: 'lastmjs' };

                return testEquality(result, expected);
            }
        },
        {
            name: 'getUserById',
            test: async () => {
                const result =
                    await simpleUserAccountsCanister.getUserById('0');
                const expected = { id: '0', username: 'lastmjs' };

                return testEquality(result, [expected]);
            }
        },
        {
            name: 'getAllUsers',
            test: async () => {
                const result = await simpleUserAccountsCanister.getAllUsers();

                const expected = { id: '0', username: 'lastmjs' };

                return testEquality(result, [expected]);
            }
        }
    ];
}
