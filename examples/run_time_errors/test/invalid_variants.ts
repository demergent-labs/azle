import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

const valueIsNotAnObjectErrorMessage = `[TypeError: Value is not of type 'UserDefinedVariant'] {
  [cause]: TypeError: Value is not an object
}`;

const variantMustContainExactlyOnePropertyErrorMessage = `[TypeError: Value is not of type 'UserDefinedVariant'] {
  [cause]: TypeError: Value must contain exactly one of the following properties: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon']
}`;

// TODO: The formatting on this should be better like the following comment.
// const vecInnerValueIsNotAUserDefinedTypeErrorMessage = `[TypeError: Value is not of type 'Vec'] {
//   [cause]: TypeError: Value is not of type 'UserDefinedVariant' {
//     [cause]: TypeError: Value is not an object
//   }
// }`;
const vecInnerValueIsNotAUserDefinedTypeErrorMessage = `[TypeError: Value is not of type 'Vec'] {
  [cause]: [TypeError: Value is not of type 'UserDefinedVariant'] {
  [cause]: TypeError: Value is not an object
}
}`;

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
        // expectError(
        //     'return an object with multiple tags as an invalid user-defined variant',
        //     errorCanister.returnObjectWithMultipleTagsAsInvalidUserDefinedVariant,
        //     variantMustContainExactlyOnePropertyErrorMessage
        // ),
        expectError(
            'returnStringAsInvalidVecUserDefinedVariant',
            errorCanister.returnStringAsInvalidVecUserDefinedVariant,
            "TypeError: Value is not of type 'Vec'"
        ),
        expectError(
            'returnObjectAsInvalidVecUserDefinedVariant',
            errorCanister.returnObjectAsInvalidVecUserDefinedVariant,
            "TypeError: Value is not of type 'Vec'"
        ),
        expectError(
            'returnArrayWithInvalidUserDefinedVariant',
            errorCanister.returnArrayWithInvalidUserDefinedVariant,
            vecInnerValueIsNotAUserDefinedTypeErrorMessage
        )
    ];
}
