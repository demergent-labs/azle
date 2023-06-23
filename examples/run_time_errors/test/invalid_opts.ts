import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

export function getInvalidOptTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        expectError(
            'return non object',
            errorCanister.returnNonObject,
            "TypeError: value is not of type 'Opt'"
        ),
        expectError(
            'return object with both Some and None',
            errorCanister.returnBothSomeAndNone,
            "TypeError: value is not of type 'Opt'"
        ),
        expectError(
            'return object with neither Some nor None',
            errorCanister.returnObjectWithNeitherSomeNorNone,
            "TypeError: value is not of type 'Opt'"
        ),
        expectError(
            'return object with non null None value',
            errorCanister.returnNonNullNone,
            "TypeError: value is not of type 'null'"
        ),
        expectError(
            'return object with invalid Some value',
            errorCanister.returnInvalidSomeValue,
            "TypeError: value is not of type 'string'"
        )
    ];
}
