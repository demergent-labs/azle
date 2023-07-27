import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

const valueIsNotAPrincipalErrorMessage =
    "TypeError: Value is not of type 'Principal'";

const toTextNotAFunctionErrorMessage = `TypeError: Value is not of type 'Principal'
  [cause]: TypeError: Property 'toText' of object is not a function`;

const customToTextErrorMessage = `TypeError: Value is not of type 'Principal'
  [cause]: Error: Custom error from toText method`;

const valueIsNotAStringErrorMessage = `TypeError: Value is not of type 'Principal'
  [cause]: TypeError: Return value of method 'toText' is not of type 'string'`;

const invalidChecksumErrorMessage =
    'Error: Principal "aaaaa-aa" does not have a valid checksum (original value "aa" may not be a valid Principal ID).';

const textTooShortErrorMessage = `TypeError: Value is not of type 'Principal'
  [cause]: Error: TextTooShortError: Text is too short.`;

export function getInvalidPrincipalTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        expectError(
            'return a string as an invalid Principal',
            errorCanister.returnStringAsInvalidPrincipal,
            valueIsNotAPrincipalErrorMessage
        ),
        expectError(
            'return an empty object as an invalid Principal',
            errorCanister.returnEmptyObjectAsInvalidPrincipal,
            toTextNotAFunctionErrorMessage
        ),
        expectError(
            'return an object where toText is not a function, as an invalid Principal',
            errorCanister.returnInvalidToTextPropertyAsInvalidPrincipal,
            toTextNotAFunctionErrorMessage
        ),
        expectError(
            'throw in Principal.toText method, as an invalid Principal',
            errorCanister.throwInPrincipalToTextMethodAsInvalidPrincipal,
            customToTextErrorMessage
        ),
        expectError(
            "return an object where toText doesn't return a string, as an invalid Principal",
            errorCanister.returnInvalidToTextReturnValueAsInvalidPrincipal,
            valueIsNotAStringErrorMessage
        ),
        expectError(
            'throw when calling Principal.fromText',
            errorCanister.throwWhenCallingPrincipalFromText,
            invalidChecksumErrorMessage
        ),
        expectError(
            'return a Principal from invalid text',
            errorCanister.returnInvalidPrincipalFromTooShortOfText,
            textTooShortErrorMessage
        )
    ];
}
