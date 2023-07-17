import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

export function getThrownErrorTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        expectError('throw big int', errorCanister.throwBigint, '3'),
        expectError('throw boolean', errorCanister.throwBoolean, 'false'),
        expectError(
            'throw class',
            errorCanister.throwClass,
            'CustomClass toString'
        ),
        expectError(
            'throw custom error',
            errorCanister.throwCustomError,
            'Error: This is a custom error'
        ),
        expectError('throw int', errorCanister.throwInt, '3'),
        expectError('throw null', errorCanister.throwNull, 'null'),
        expectError(
            'throw null reference',
            errorCanister.throwNullReference,
            "TypeError: cannot convert 'null' or 'undefined' to object"
        ),
        expectError(
            'throw object',
            errorCanister.throwObject,
            '[object Object]'
        ),
        expectError('throw rational', errorCanister.throwRational, '3.14'),
        expectError('throw string', errorCanister.throwString, 'Hello World'),
        expectError('throw symbol', errorCanister.throwSymbol, 'Symbol()'),
        expectError(
            'throw undefined',
            errorCanister.throwUndefined,
            'undefined'
        )
    ];
}
