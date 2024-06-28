import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

const valueIsNotAFuncErrorMessage = "TypeError: Value is not of type 'Func'";

const expectedArrayErrorMessage = `TypeError: Value is not of type 'Func'
  [cause]: TypeError: Expected 'Array', given 'Object'`;

const index0IsUndefinedErrorMessage = `TypeError: Value is not of type 'Func'
  [cause]: TypeError: Index '0' is undefined`;

const valueIsNotOfTypePrincipalErrorMessage = `TypeError: Value is not of type 'Func'
  [cause]: TypeError: Index '0' is not of type 'Principal'
  [cause]: TypeError: Value is not of type 'Principal'`;

const propertyToTextIsNotAFunctionErrorMessage = `TypeError: Value is not of type 'Func'
  [cause]: TypeError: Index '0' is not of type 'Principal'
  [cause]: TypeError: Value is not of type 'Principal'
  [cause]: TypeError: Property 'toText' of object is not a function`;

const index1IsUndefinedErrorMessage = `TypeError: Value is not of type 'Func'
  [cause]: TypeError: Index '1' is undefined`;

const valueIsNotAStringErrorMessage = `TypeError: Value is not of type 'Func'
  [cause]: TypeError: Index '1' is not of type 'string'
  [cause]: TypeError: Value is not of type 'string'`;

export function getInvalidFuncTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('return a non-array value as an invalid Func', async () => {
            await expect(
                errorCanister.returnNonArrayValueAsInvalidFunc
            ).rejects.toThrow(valueIsNotAFuncErrorMessage);
        });

        it('return an empty object as an invalid Func', async () => {
            await expect(
                errorCanister.returnEmptyObjectAsInvalidFunc
            ).rejects.toThrow(expectedArrayErrorMessage);
        });

        it('return an empty array as an invalid Func', async () => {
            await expect(
                errorCanister.returnEmptyArrayAsInvalidFunc
            ).rejects.toThrow(index0IsUndefinedErrorMessage);
        });

        it('return a non-principal value as an invalid Func', async () => {
            await expect(
                errorCanister.returnNonPrincipalValueAsInvalidFunc
            ).rejects.toThrow(valueIsNotOfTypePrincipalErrorMessage);
        });

        it('return an empty object for a principal as an invalid Func', async () => {
            await expect(
                errorCanister.returnEmptyObjectPrincipalAsInvalidFunc
            ).rejects.toThrow(propertyToTextIsNotAFunctionErrorMessage);
        });

        it('return array with only a principal as an invalid Func', async () => {
            await expect(
                errorCanister.returnArrayWithOnlyPrincipalAsInvalidFunc
            ).rejects.toThrow(index1IsUndefinedErrorMessage);
        });

        it('return a non-string canister method name as an invalid Func', async () => {
            await expect(
                errorCanister.returnNonStringCanisterMethodNameAsInvalidFunc
            ).rejects.toThrow(valueIsNotAStringErrorMessage);
        });
    };
}
