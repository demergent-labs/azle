import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

const invalidPropertiesErrorMessage = `TypeError: Value is not of type '_AzleResult'
  [cause]: TypeError: Value must contain exactly one of the following properties: ['Ok', 'Err']`;

const invalidOkValueErrorMessage = `TypeError: Value is not of type '_AzleResult'
  [cause]: TypeError: Property 'Ok' is not of the correct type
  [cause]: TypeError: Value is not of type 'string'`;

const invalidErrValueErrorMessage = `TypeError: Value is not of type '_AzleResult'
  [cause]: TypeError: Property 'Err' is not of the correct type
  [cause]: TypeError: Value is not of type 'string'`;

export function getInvalidResultTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        expectError(
            'return non-object as invalid result',
            errorCanister.returnNonObjectAsInvalidResult,
            "TypeError: Value is not of type '_AzleResult'\n  [cause]: TypeError: Value is not an object"
        ),
        // TODO: This should be an error
        // See https://github.com/demergent-labs/azle/issues/1128
        // expectError(
        //     'return both Ok and Err',
        //     errorCanister.returnBothOkAndErr,
        //     invalidPropertiesErrorMessage
        // ),
        expectError(
            'return object with neither Ok nor Err',
            errorCanister.returnObjectWithNeitherOkNorErr,
            invalidPropertiesErrorMessage
        ),
        expectError(
            'return invalid Ok value',
            errorCanister.returnInvalidOkValue,
            invalidOkValueErrorMessage
        ),
        expectError(
            'return invalid Err value',
            errorCanister.returnInvalidErrValue,
            invalidErrValueErrorMessage
        )
    ];
}
