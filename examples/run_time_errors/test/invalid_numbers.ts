import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

export function getInvalidNumberTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        expectError(
            'return invalid number',
            errorCanister.returnInvalidNumber,
            // TODO: change this to "TypeError: Value is not of type 'number'"
            // See https://github.com/demergent-labs/azle/issues/1108
            "TypeError: Value is not of type 'float64'"
        ),
        expectError(
            'return invalid int',
            errorCanister.returnInvalidInt,
            "TypeError: Value is not of type 'int'"
        ),
        expectError(
            'return invalid int8',
            errorCanister.returnInvalidInt8,
            "TypeError: Value is not of type 'int8'"
        ),
        expectError(
            'return invalid int16',
            errorCanister.returnInvalidInt16,
            "TypeError: Value is not of type 'int16'"
        ),
        expectError(
            'return invalid int32',
            errorCanister.returnInvalidInt32,
            "TypeError: Value is not of type 'int32'"
        ),
        expectError(
            'return invalid int64',
            errorCanister.returnInvalidInt64,
            "TypeError: Value is not of type 'int64'"
        ),
        expectError(
            'return invalid nat',
            errorCanister.returnInvalidNat,
            "TypeError: Value is not of type 'nat'"
        ),
        expectError(
            'return invalid nat8',
            errorCanister.returnInvalidNat8,
            "TypeError: Value is not of type 'nat8'"
        ),
        expectError(
            'return invalid nat16',
            errorCanister.returnInvalidNat16,
            "TypeError: Value is not of type 'nat16'"
        ),
        expectError(
            'return invalid nat32',
            errorCanister.returnInvalidNat32,
            "TypeError: Value is not of type 'nat32'"
        ),
        expectError(
            'return invalid nat64',
            errorCanister.returnInvalidNat64,
            "TypeError: Value is not of type 'nat64'"
        ),
        expectError(
            'return invalid float32',
            errorCanister.returnInvalidFloat32,
            "TypeError: Value is not of type 'float32'"
        ),
        expectError(
            'return invalid float64',
            errorCanister.returnInvalidFloat64,
            "TypeError: Value is not of type 'float64'"
        )
    ];
}
