import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

export function getInvalidVecTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        expectError(
            'return non-object as invalid Vec',
            errorCanister.returnNonObjectAsInvalidVec,
            "TypeError: Value is not of type 'Vec'"
        ),
        expectError(
            'return an empty object as invalid Vec',
            errorCanister.returnNonArrayAsInvalidVec,
            "TypeError: Value is not of type 'Vec'"
        )
    ];
}
