import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

const valueIsNotAnObjectErrorMessage = `TypeError: Value is not of type 'UserDefinedVariant'
  [cause]: TypeError: Value is not an object`;

const variantMustContainExactlyOnePropertyErrorMessage = `TypeError: Value is not of type 'UserDefinedVariant'
  [cause]: TypeError: Value must contain exactly one of the following properties: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta']`;

const fieldIsNotOfCorrectTypeErrorMessage = `TypeError: Value is not of type 'UserDefinedVariant'
  [cause]: TypeError: Property 'Zeta' is not of the correct type
  [cause]: TypeError: Value is not of type '_InlineUserDefinedVariantZeta'
  [cause]: TypeError: One or more properties are of an incorrect type`;

const vecInnerValueIsNotAUserDefinedTypeErrorMessage = `TypeError: Value is not of type 'Vec'
  [cause]: TypeError: Value is not of type 'UserDefinedVariant'
  [cause]: TypeError: Value is not an object`;

export function getInvalidVariantTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('return string as invalid user-defined variant', async () => {
            await expect(
                errorCanister.returnStringAsInvalidUserDefinedVariant
            ).rejects.toThrow(valueIsNotAnObjectErrorMessage);
        });

        it('return an empty object as an invalid user-defined variant', async () => {
            await expect(
                errorCanister.returnEmptyObjectAsInvalidUserDefinedVariant
            ).rejects.toThrow(variantMustContainExactlyOnePropertyErrorMessage);
        });

        it('return an empty object as an invalid user-defined variant', async () => {
            await expect(
                errorCanister.returnObjectWithInvalidTagAsInvalidUserDefinedVariant
            ).rejects.toThrow(variantMustContainExactlyOnePropertyErrorMessage);
        });

        // TODO: We should return an error if multiple-tags are included in a type
        // See https://github.com/demergent-labs/azle/issues/1128
        it.skip('return an object with multiple tags as an invalid user-defined variant', async () => {
            await expect(
                errorCanister.returnObjectWithMultipleTagsAsInvalidUserDefinedVariant
            ).rejects.toThrow(variantMustContainExactlyOnePropertyErrorMessage);
        });

        it('return a field with invalid types', async () => {
            await expect(
                errorCanister.returnObjectWithInvalidFieldsAsInvalidUserDefinedVariant
            ).rejects.toThrow(fieldIsNotOfCorrectTypeErrorMessage);
        });

        it('return a string as an invalid vec of user-defined variant', async () => {
            await expect(
                errorCanister.returnStringAsInvalidVecUserDefinedVariant
            ).rejects.toThrow("TypeError: Value is not of type 'Vec'");
        });

        it('return an object as an invalid vec of user-defined variant', async () => {
            await expect(
                errorCanister.returnObjectAsInvalidVecUserDefinedVariant
            ).rejects.toThrow("TypeError: Value is not of type 'Vec'");
        });

        it('return an array with an invalid user-defined variant', async () => {
            await expect(
                errorCanister.returnArrayWithInvalidUserDefinedVariant
            ).rejects.toThrow(vecInnerValueIsNotAUserDefinedTypeErrorMessage);
        });
    };
}
