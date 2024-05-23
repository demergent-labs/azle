import { ActorSubclass } from '@dfinity/agent';
import { Test, test, testEquality } from 'azle/test';

import { User } from '../src/candid_types';
import { _SERVICE } from './dfx_generated/complex_types/complex_types.did.d';

const EXPECTED_USER_1: User = {
    id: 0,
    username: 'user1',
    threads: [],
    posts: [],
    reactions: []
};

export function get_tests(
    complex_types_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'get_all_users',
            test: async () => {
                const result = await complex_types_canister.getAllUsers(0);

                return test(
                    result.length === 0,
                    `Expected no users, received ${result.length}`
                );
            }
        },
        {
            name: 'create_user',
            test: async () => {
                const result = await complex_types_canister.createUser(
                    'user1',
                    0
                );

                return testEquality(result, EXPECTED_USER_1);
            }
        },
        {
            name: 'get_all_users',
            test: async () => {
                const result = await complex_types_canister.getAllUsers(0);

                return testEquality(result, [EXPECTED_USER_1]);
            }
        }
    ];
}
