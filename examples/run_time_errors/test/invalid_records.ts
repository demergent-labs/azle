import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

const valueIsNotAnObjectErrorMessage = `TypeError: Value is not of type 'UserDefinedRecord'
  [cause]: TypeError: Value is not an object`;

const invalidPropertiesErrorMessage = `TypeError: Value is not of type 'UserDefinedRecord'
  [cause]: TypeError: One or more properties are of an incorrect type`;

const vecInnerValueIsNotAUserDefinedRecordErrorMessage = `TypeError: Value is not of type 'Vec'
  [cause]: TypeError: Value is not of type 'UserDefinedRecord'
  [cause]: TypeError: Value is not an object`;

export function getInvalidRecordTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('return string as invalid user-defined record', async () => {
            await expect(
                errorCanister.returnStringAsInvalidUserDefinedRecord
            ).rejects.toThrow(valueIsNotAnObjectErrorMessage);
        });

        it('return an empty object as an invalid user-defined record', async () => {
            await expect(
                errorCanister.returnEmptyObjectAsInvalidUserDefinedRecord
            ).rejects.toThrow(invalidPropertiesErrorMessage);
        });

        it('return an array with an invalid user-defined record', async () => {
            await expect(
                errorCanister.returnArrayWithInvalidUserDefinedRecord
            ).rejects.toThrow(vecInnerValueIsNotAUserDefinedRecordErrorMessage);
        });
    };
}
