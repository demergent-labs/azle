import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

export function getTests(errorCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        ...getThrownErrorTests(errorCanister),
        ...getInvalidOptTests(errorCanister),
        ...getInvalidPrimitiveTests(errorCanister)
    ];
}

function getThrownErrorTests(errorCanister: ActorSubclass<_SERVICE>): Test[] {
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

function getInvalidOptTests(errorCanister: ActorSubclass<_SERVICE>): Test[] {
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

function getInvalidPrimitiveTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        // expectError(
        //     'return invalid blob value',
        //     errorCanister.invalidBlobReturnValue,
        //     "TypeError: value is not of type 'blob'"
        // ),
        expectError(
            'return invalid boolean value',
            errorCanister.invalidBooleanReturnValue,
            "TypeError: value is not of type 'boolean'"
        ),
        expectError(
            'return invalid empty value',
            errorCanister.invalidEmptyReturnValue,
            "TypeError: value cannot be converted into type 'empty'"
        ),
        expectError(
            'return invalid null value',
            errorCanister.invalidNullReturnValue,
            "TypeError: value is not of type 'null'"
        ),
        expectError(
            'return invalid string value',
            errorCanister.invalidStringReturnValue,
            "TypeError: value is not of type 'string'"
        ),
        expectError(
            'return invalid text value',
            errorCanister.invalidTextReturnValue,
            // TODO: Consider saying "value is not of type 'text'"
            "TypeError: value is not of type 'string'"
        ),
        expectError(
            'return invalid void value',
            errorCanister.invalidVoidReturnValue,
            "TypeError: value is not of type 'void'"
        )
    ];
}

/** Creates a test that asserts the provided method throws the provided value */
function expectError(
    /** The name of the test */
    name: string,
    /** The method to call */
    canisterMethod: () => Promise<any>,
    /** The value we expect the method to throw */
    expectedValue: any
): Test {
    return {
        name,
        test: async () => {
            return {
                Ok: await testThrow(canisterMethod, expectedValue)
            };
        }
    };
}

async function testThrow(
    errorFunc: () => Promise<void>,
    expectedError: string
): Promise<boolean> {
    return checkErrorMessage(await getErrorMessage(errorFunc), expectedError);
}

async function getErrorMessage(errorFunc: () => Promise<any>): Promise<any> {
    try {
        await errorFunc();
    } catch (err) {
        return err;
    }
}

function checkErrorMessage(actualError: any, expectedError: string) {
    return (
        'result' in actualError &&
        'reject_message' in actualError.result &&
        actualError.result.reject_message.includes(`Uncaught ${expectedError}`)
    );
}
