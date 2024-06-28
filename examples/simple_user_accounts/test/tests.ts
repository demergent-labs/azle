import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/simple_user_accounts/simple_user_accounts.did';

export function getTests(
    simpleUserAccountsCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('getUserById', async () => {
            const result = await simpleUserAccountsCanister.getUserById('0');

            expect(result).toHaveLength(0);
        });

        it('getAllUsers', async () => {
            const result = await simpleUserAccountsCanister.getAllUsers();

            expect(result).toHaveLength(0);
        });

        it('createUser', async () => {
            const result =
                await simpleUserAccountsCanister.createUser('lastmjs');

            const expectedResult = { id: '0', username: 'lastmjs' };

            expect(result).toStrictEqual(expectedResult);
        });

        it('getUserById', async () => {
            const result = await simpleUserAccountsCanister.getUserById('0');

            const expectedResult = { id: '0', username: 'lastmjs' };

            expect(result).toStrictEqual([expectedResult]);
        });

        it('getAllUsers', async () => {
            const result = await simpleUserAccountsCanister.getAllUsers();

            const expectedResult = { id: '0', username: 'lastmjs' };

            expect(result).toStrictEqual([expectedResult]);
        });
    };
}
