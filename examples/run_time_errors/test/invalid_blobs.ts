import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

const valueIsNotOfTypeBlobErrorMessage =
    "TypeError: Value is not of type 'blob'";

const valueIsNotATypedArrayErrorMessage = `TypeError: Value is not of type 'blob'
  [cause]: TypeError: Value is not an instance of 'TypedArray'`;

export function getInvalidBlobTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        expectError(
            'return non-object as invalid blob',
            errorCanister.returnNonObjectAsInvalidBlob,
            valueIsNotOfTypeBlobErrorMessage
        ),
        expectError(
            'return an empty object as invalid blob',
            errorCanister.returnEmptyObjectAsInvalidBlob,
            valueIsNotATypedArrayErrorMessage
        )
    ];
}
