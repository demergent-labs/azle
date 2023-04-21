import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

export function getTests(errorCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        expectToThrow('big int', errorCanister.throwBigint, '3'),
        expectToThrow('boolean', errorCanister.throwBoolean, 'false'),
        expectToThrow(
            'class',
            errorCanister.throwClass,
            'CustomClass toString'
        ),
        expectToThrow(
            'custom error',
            errorCanister.throwCustomError,
            'Error: This is a custom error'
        ),
        expectToThrow('int', errorCanister.throwInt, '3'),
        expectToThrow('null', errorCanister.throwNull, 'null'),
        expectToThrow(
            'null reference',
            errorCanister.throwNullReference,
            "TypeError: cannot convert 'null' or 'undefined' to object"
        ),
        expectToThrow('object', errorCanister.throwObject, '[object Object]'),
        expectToThrow('rational', errorCanister.throwRational, '3.14'),
        expectToThrow('string', errorCanister.throwString, 'Hello World'),
        expectToThrow('symbol', errorCanister.throwSymbol, 'Symbol()'),
        expectToThrow('undefined', errorCanister.throwUndefined, 'undefined')
    ];
}

/** Creates a test that asserts the provided method throws the provided value */
function expectToThrow(
    /** The name of the test */
    name: string,
    /** The method to call */
    canisterMethod: () => Promise<void>,
    /** The value we expect the method to throw */
    expectedValue: any
): Test {
    return {
        name: `throw ${name}`,
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

async function getErrorMessage(errorFunc: () => Promise<void>): Promise<any> {
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
