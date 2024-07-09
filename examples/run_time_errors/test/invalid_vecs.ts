import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

const invalidVecMemberErrorMessage = `TypeError: Value is not of type 'Vec'
  [cause]: TypeError: Value is not of type 'string'`;

export function getInvalidVecTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('return non-object as invalid Vec', async () => {
            await expect(
                errorCanister.returnNonObjectAsInvalidVec
            ).rejects.toThrow("TypeError: Value is not of type 'Vec'");
        });

        it('return an empty object as invalid Vec', async () => {
            await expect(
                errorCanister.returnNonArrayAsInvalidVec
            ).rejects.toThrow("TypeError: Value is not of type 'Vec'");
        });

        it('return an array containing an invalid item', async () => {
            await expect(
                errorCanister.returnArrayWithInvalidVecItem
            ).rejects.toThrow(invalidVecMemberErrorMessage);
        });
    };
}
