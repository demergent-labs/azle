import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

import { User } from '../src/candid_types';
import { _SERVICE } from './dfx_generated/complex_types/complex_types.did.d';

const EXPECTED_USER_1: User = {
    id: '0',
    username: 'user1',
    threads: [],
    posts: [],
    reactions: []
};

export function getTests(complexTypesCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('verifies that there are no stored complex variables yet', async () => {
            const result = await complexTypesCanister.getAllUsers(0);

            expect(result).toHaveLength(0);
        });

        it('creates and stores a user with a complex type', async () => {
            const result = await complexTypesCanister.createUser('user1', 0);

            expect(result).toStrictEqual(EXPECTED_USER_1);
        });

        it('recalls the stored complex values', async () => {
            const result = await complexTypesCanister.getAllUsers(0);

            expect(result).toStrictEqual([EXPECTED_USER_1]);
        });
    };
}
