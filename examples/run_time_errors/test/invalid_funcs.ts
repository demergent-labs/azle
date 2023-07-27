import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

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
): Test[] {
    return [
        expectError(
            'return a non-array value as an invalid Func',
            errorCanister.returnNonArrayValueAsInvalidFunc,
            valueIsNotAFuncErrorMessage
        ),
        expectError(
            'return an empty object as an invalid Func',
            errorCanister.returnEmptyObjectAsInvalidFunc,
            expectedArrayErrorMessage
        ),
        expectError(
            'return an empty array as an invalid Func',
            errorCanister.returnEmptyArrayAsInvalidFunc,
            index0IsUndefinedErrorMessage
        ),
        expectError(
            'return a non-principal value as an invalid Func',
            errorCanister.returnNonPrincipalValueAsInvalidFunc,
            valueIsNotOfTypePrincipalErrorMessage
        ),
        expectError(
            'return an empty object for a principal as an invalid Func',
            errorCanister.returnEmptyObjectPrincipalAsInvalidFunc,
            propertyToTextIsNotAFunctionErrorMessage
        ),
        expectError(
            'return array with only a principal as an invalid Func',
            errorCanister.returnArrayWithOnlyPrincipalAsInvalidFunc,
            index1IsUndefinedErrorMessage
        ),
        expectError(
            'return a non-string canister method name as an invalid Func',
            errorCanister.returnNonStringCanisterMethodNameAsInvalidFunc,
            valueIsNotAStringErrorMessage
        )
    ];
}
