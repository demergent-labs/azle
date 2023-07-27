import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

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
): Test[] {
    return [
        expectError(
            'return string as invalid user-defined variant',
            errorCanister.returnStringAsInvalidUserDefinedVariant,
            valueIsNotAnObjectErrorMessage
        ),
        expectError(
            'return an empty object as an invalid user-defined variant',
            errorCanister.returnEmptyObjectAsInvalidUserDefinedVariant,
            variantMustContainExactlyOnePropertyErrorMessage
        ),
        expectError(
            'return an empty object as an invalid user-defined variant',
            errorCanister.returnObjectWithInvalidTagAsInvalidUserDefinedVariant,
            variantMustContainExactlyOnePropertyErrorMessage
        ),
        // TODO: We should return an error if multiple-tags are included in a type
        // See https://github.com/demergent-labs/azle/issues/1128
        // expectError(
        //     'return an object with multiple tags as an invalid user-defined variant',
        //     errorCanister.returnObjectWithMultipleTagsAsInvalidUserDefinedVariant,
        //     variantMustContainExactlyOnePropertyErrorMessage
        // ),
        expectError(
            'return a field with invalid types',
            errorCanister.returnObjectWithInvalidFieldsAsInvalidUserDefinedVariant,
            fieldIsNotOfCorrectTypeErrorMessage
        ),
        expectError(
            'return a string as an invalid vec of user-defined variant',
            errorCanister.returnStringAsInvalidVecUserDefinedVariant,
            "TypeError: Value is not of type 'Vec'"
        ),
        expectError(
            'return an object as an invalid vec of user-defined variant',
            errorCanister.returnObjectAsInvalidVecUserDefinedVariant,
            "TypeError: Value is not of type 'Vec'"
        ),
        expectError(
            'return an array with an invalid user-defined variant',
            errorCanister.returnArrayWithInvalidUserDefinedVariant,
            vecInnerValueIsNotAUserDefinedTypeErrorMessage
        )
    ];
}
