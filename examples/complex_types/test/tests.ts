import { ActorSubclass } from '@dfinity/agent';
import { createTestResult, equals, Test } from 'azle/test';

import { _SERVICE } from './dfx_generated/complex_types/complex_types.did.d';

const USER_1 = {
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

                return createTestResult(
                    () => result.length === 0,
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

                return equals(result, USER_1);
            }
        },
        {
            name: 'get_all_users',
            test: async () => {
                const result = await complex_types_canister.getAllUsers(0);

                return equals(result, [USER_1]);
            }
        }
    ];
}
