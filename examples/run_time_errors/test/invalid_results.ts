import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

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
): Test {
    return () => {
        it('return non-object as invalid result', async () => {
            await expect(
                errorCanister.returnNonObjectAsInvalidResult
            ).rejects.toThrow(
                "TypeError: Value is not of type '_AzleResult'\n  [cause]: TypeError: Value is not an object"
            );
        });

        // TODO: This should be an error
        // See https://github.com/demergent-labs/azle/issues/1128
        it.skip('return both Ok and Err', async () => {
            await expect(errorCanister.returnBothOkAndErr).rejects.toThrow(
                invalidPropertiesErrorMessage
            );
        });

        it('return object with neither Ok nor Err', async () => {
            await expect(
                errorCanister.returnObjectWithNeitherOkNorErr
            ).rejects.toThrow(invalidPropertiesErrorMessage);
        });

        it('return invalid Ok value', async () => {
            await expect(errorCanister.returnInvalidOkValue).rejects.toThrow(
                invalidOkValueErrorMessage
            );
        });

        it('return invalid Err value', async () => {
            await expect(errorCanister.returnInvalidErrValue).rejects.toThrow(
                invalidErrValueErrorMessage
            );
        });
    };
}
