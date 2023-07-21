import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

export function getInvalidPrimitiveTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        expectError(
            'return invalid boolean value',
            errorCanister.returnInvalidBooleanValue,
            "TypeError: Value is not of type 'boolean'"
        ),
        expectError(
            'return invalid empty value',
            errorCanister.returnInvalidEmptyValue,
            "TypeError: Value cannot be converted into type 'empty'"
        ),
        expectError(
            'return invalid null value',
            errorCanister.returnInvalidNullValue,
            "TypeError: Value is not of type 'null'"
        ),
        expectError(
            'return invalid string value',
            errorCanister.returnInvalidStringValue,
            "TypeError: Value is not of type 'string'"
        ),
        expectError(
            'return invalid text value',
            errorCanister.returnInvalidTextValue,
            // TODO: Consider saying "Value is not of type 'text'"
            // See https://github.com/demergent-labs/azle/issues/1108
            "TypeError: Value is not of type 'string'"
        ),
        expectError(
            'return invalid void value',
            errorCanister.returnInvalidVoidValue,
            "TypeError: Value is not of type 'void'"
        ),
        expectError(
            'return invalid void alias value',
            errorCanister.returnInvalidVoidAliasValue,
            "TypeError: Value is not of type 'void'"
        ),
        expectError(
            'return invalid null alias value',
            errorCanister.returnInvalidNullAliasValue,
            "TypeError: Value is not of type 'null'"
        )
    ];
}
