import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

import { getInvalidBlobTests } from './invalid_blobs';
import { getInvalidFuncTests } from './invalid_funcs';
import { getInvalidNumberTests } from './invalid_numbers';
import { getInvalidOptTests } from './invalid_opts';
import { getInvalidPrimitiveTests } from './invalid_primitives';
import { getInvalidPrincipalTests } from './invalid_principals';
import { getInvalidRecordTests } from './invalid_records';
import { getInvalidResultTests } from './invalid_results';
import { getInvalidVariantTests } from './invalid_variants';
import { getInvalidVecTests } from './invalid_vecs';
import { getThrownErrorTests } from './thrown_errors';

export function getTests(errorCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        ...getInvalidBlobTests(errorCanister),
        ...getInvalidFuncTests(errorCanister),
        ...getInvalidNumberTests(errorCanister),
        ...getInvalidOptTests(errorCanister),
        ...getInvalidPrimitiveTests(errorCanister),
        ...getInvalidPrincipalTests(errorCanister),
        ...getInvalidRecordTests(errorCanister),
        ...getInvalidResultTests(errorCanister),
        ...getInvalidVariantTests(errorCanister),
        ...getInvalidVecTests(errorCanister),
        ...getThrownErrorTests(errorCanister)
    ];
}

/** Creates a test that asserts the provided method throws the provided value */
export function expectError(
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
    const actualResult =
        'result' in actualError &&
        'reject_message' in actualError.result &&
        actualError.result.reject_message.includes(`Uncaught ${expectedError}`);
    if (actualResult) {
        return actualResult;
    }
    // TODO reword all of the errors and make sure the tests match https://github.com/demergent-labs/azle/issues/1192
    console.log('=========================================================');
    console.log('Result:');
    if (actualError === undefined) {
        console.log('actualError is undefined');
    } else if ('result' in actualError) {
        if (actualError.result === undefined) {
            console.log('actualResult.result is undefined');
        } else {
            if ('reject_message' in actualError.result) {
                console.log(actualError.result.reject_message);
            } else {
                console.log('reject message is not in actualError.result');
            }
        }
    } else {
        console.log('result not in actualError');
    }
    console.log('Expecting:');
    console.log(expectedError);
    console.log('=========================================================');
    return false;
}
