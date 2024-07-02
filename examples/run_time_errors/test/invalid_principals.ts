import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

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
): Test {
    return () => {
        it('return a string as an invalid Principal', async () => {
            await expect(
                errorCanister.returnStringAsInvalidPrincipal
            ).rejects.toThrow(valueIsNotAPrincipalErrorMessage);
        });

        it('return an empty object as an invalid Principal', async () => {
            await expect(
                errorCanister.returnEmptyObjectAsInvalidPrincipal
            ).rejects.toThrow(toTextNotAFunctionErrorMessage);
        });

        it('return an object where toText is not a function, as an invalid Principal', async () => {
            await expect(
                errorCanister.returnInvalidToTextPropertyAsInvalidPrincipal
            ).rejects.toThrow(toTextNotAFunctionErrorMessage);
        });

        it('throw in Principal.toText method, as an invalid Principal', async () => {
            await expect(
                errorCanister.throwInPrincipalToTextMethodAsInvalidPrincipal
            ).rejects.toThrow(customToTextErrorMessage);
        });

        it("return an object where toText doesn't return a string, as an invalid Principal", async () => {
            await expect(
                errorCanister.returnInvalidToTextReturnValueAsInvalidPrincipal
            ).rejects.toThrow(valueIsNotAStringErrorMessage);
        });

        it('throw when calling Principal.fromText', async () => {
            await expect(
                errorCanister.throwWhenCallingPrincipalFromText
            ).rejects.toThrow(invalidChecksumErrorMessage);
        });

        it('return a Principal from invalid text', async () => {
            await expect(
                errorCanister.returnInvalidPrincipalFromTooShortOfText
            ).rejects.toThrow(textTooShortErrorMessage);
        });
    };
}
