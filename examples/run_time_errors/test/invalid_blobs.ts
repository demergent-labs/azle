import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

const valueIsNotOfTypeBlobErrorMessage =
    "TypeError: Value is not of type 'blob'";

const valueIsNotATypedArrayErrorMessage = `TypeError: Value is not of type 'blob'
  [cause]: TypeError: Value is not an instance of 'TypedArray'`;

export function getInvalidBlobTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('return non-object as invalid blob', async () => {
            await expect(
                errorCanister.returnNonObjectAsInvalidBlob
            ).rejects.toThrow(valueIsNotOfTypeBlobErrorMessage);
        });

        it('return an empty object as invalid blob', async () => {
            await expect(
                errorCanister.returnEmptyObjectAsInvalidBlob
            ).rejects.toThrow(valueIsNotATypedArrayErrorMessage);
        });
    };
}
