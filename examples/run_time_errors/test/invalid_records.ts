import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

const valueIsNotAnObjectErrorMessage = `TypeError: Value is not of type 'UserDefinedRecord'
  [cause]: TypeError: Value is not an object`;

const invalidPropertiesErrorMessage = `TypeError: Value is not of type 'UserDefinedRecord'
  [cause]: TypeError: One or more properties are of an incorrect type`;

const vecInnerValueIsNotAUserDefinedRecordErrorMessage = `TypeError: Value is not of type 'Vec'
  [cause]: TypeError: Value is not of type 'UserDefinedRecord'
  [cause]: TypeError: Value is not an object`;

export function getInvalidRecordTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        expectError(
            'return string as invalid user-defined record',
            errorCanister.returnStringAsInvalidUserDefinedRecord,
            valueIsNotAnObjectErrorMessage
        ),
        expectError(
            'return an empty object as an invalid user-defined record',
            errorCanister.returnEmptyObjectAsInvalidUserDefinedRecord,
            invalidPropertiesErrorMessage
        ),
        expectError(
            'return an array with an invalid user-defined record',
            errorCanister.returnArrayWithInvalidUserDefinedRecord,
            vecInnerValueIsNotAUserDefinedRecordErrorMessage
        )
    ];
}
