import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';
import { expectError } from './tests';

const invalidPropertiesErrorMessage = `TypeError: Value is not of type 'Opt'
  [cause]: TypeError: Value must contain exactly one of the following properties: ['Some', 'None']`;

export function getInvalidOptTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        expectError(
            'return non object',
            errorCanister.returnNonObject,
            "TypeError: Value is not of type 'Opt'"
        ),
        expectError(
            'return object with both Some and None',
            errorCanister.returnBothSomeAndNone,
            invalidPropertiesErrorMessage
        ),
        expectError(
            'return object with neither Some nor None',
            errorCanister.returnObjectWithNeitherSomeNorNone,
            invalidPropertiesErrorMessage
        ),
        expectError(
            'return object with non null None value',
            errorCanister.returnNonNullNone,
            "TypeError: Value is not of type 'Opt'\n  [cause]: TypeError: Value is not of type 'null'"
        ),
        expectError(
            'return object with invalid Some value',
            errorCanister.returnInvalidSomeValue,
            "TypeError: Value is not of type 'Opt'\n  [cause]: TypeError: Value is not of type 'string'"
        )
    ];
}
