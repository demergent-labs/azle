import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

export function getInvalidFuncTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        expectError(
            'return a non-array value as an invalid Func',
            errorCanister.returnNonArrayValueAsInvalidFunc,
            "TypeError: value is not of type 'Func'"
        ),
        expectError(
            'return an empty object as an invalid Func',
            errorCanister.returnEmptyObjectAsInvalidFunc,
            "[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: expected 'Array', given 'Object'\n}"
        ),
        expectError(
            'return an empty array as an invalid Func',
            errorCanister.returnEmptyArrayAsInvalidFunc,
            "[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: index '0' is undefined\n}"
        ),
        expectError(
            'return a non-principal value as an invalid Func',
            errorCanister.returnNonPrincipalValueAsInvalidFunc,
            "[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: index '0' is not of type 'Principal' {\n    [cause]: TypeError: value is not of type 'Principal'\n  }\n}"
        ),
        expectError(
            'return an empty object for a principal as an invalid Func',
            errorCanister.returnEmptyObjectPrincipalAsInvalidFunc,
            "[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: index '0' is not of type 'Principal' {\n    [cause]: TypeError: property 'toText' of object is not a function\n  }\n}"
        ),
        expectError(
            'return array with only a principal as an invalid Func',
            errorCanister.returnArrayWithOnlyPrincipalAsInvalidFunc,
            "[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: index '1' is undefined\n}"
        ),
        expectError(
            'return a non-string canister method name as an invalid Func',
            errorCanister.returnNonStringCanisterMethodNameAsInvalidFunc,
            "[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: index '1' is not of type 'string' {\n    [cause]: TypeError: value is not of type 'string'\n  }\n}"
        )
    ];
}
