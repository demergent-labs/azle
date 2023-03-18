import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

export function getTests(errorCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'throw big int',
            test: async () => {
                return {
                    Ok: await testThrow(errorCanister.throwBigint, '3')
                };
            }
        },
        {
            name: 'throw boolean',
            test: async () => {
                return {
                    Ok: await testThrow(errorCanister.throwBoolean, 'false')
                };
            }
        },
        {
            name: 'throw class',
            test: async () => {
                return {
                    Ok: await testThrow(
                        errorCanister.throwClass,
                        'CustomClass toString'
                    )
                };
            }
        },
        {
            name: 'throw custom error',
            test: async () => {
                return {
                    Ok: await testThrow(
                        errorCanister.throwCustomError,
                        'Error: This is a custom error'
                    )
                };
            }
        },
        {
            name: 'throw int',
            test: async () => {
                return {
                    Ok: await testThrow(errorCanister.throwInt, '3')
                };
            }
        },
        {
            name: 'throw null',
            test: async () => {
                return {
                    Ok: await testThrow(errorCanister.throwNull, 'null')
                };
            }
        },
        {
            name: 'throw null reference',
            test: async () => {
                return {
                    Ok: await testThrow(
                        errorCanister.throwNullReference,
                        "TypeError: cannot convert 'null' or 'undefined' to object"
                    )
                };
            }
        },
        {
            name: 'throw object',
            test: async () => {
                return {
                    Ok: await testThrow(
                        errorCanister.throwObject,
                        '[object Object]'
                    )
                };
            }
        },
        {
            name: 'throw rational',
            test: async () => {
                return {
                    Ok: await testThrow(errorCanister.throwRational, '3.14')
                };
            }
        },
        {
            name: 'throw string',
            test: async () => {
                return {
                    Ok: await testThrow(
                        errorCanister.throwString,
                        'Hello World'
                    )
                };
            }
        },
        {
            name: 'throw symbol',
            test: async () => {
                return {
                    Ok: await testThrow(errorCanister.throwSymbol, 'Symbol()')
                };
            }
        },
        {
            name: 'throw undefined',
            test: async () => {
                return {
                    Ok: await testThrow(
                        errorCanister.throwUndefined,
                        'undefined'
                    )
                };
            }
        }
    ];
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
