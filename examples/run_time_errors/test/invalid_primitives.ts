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
            "TypeError: value is not of type 'boolean'"
        ),
        expectError(
            'return invalid empty value',
            errorCanister.returnInvalidEmptyValue,
            "TypeError: value cannot be converted into type 'empty'"
        ),
        expectError(
            'return invalid null value',
            errorCanister.returnInvalidNullValue,
            "TypeError: value is not of type 'null'"
        ),
        expectError(
            'return invalid string value',
            errorCanister.returnInvalidStringValue,
            "TypeError: value is not of type 'string'"
        ),
        expectError(
            'return invalid text value',
            errorCanister.returnInvalidTextValue,
            // TODO: Consider saying "value is not of type 'text'"
            "TypeError: value is not of type 'string'"
        ),
        expectError(
            'return invalid void value',
            errorCanister.returnInvalidVoidValue,
            "TypeError: value is not of type 'void'"
        )
    ];
}
