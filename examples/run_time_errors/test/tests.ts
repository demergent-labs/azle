import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

export function get_tests(error_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'throw big int',
            test: async () => {
                return {
                    ok: await test_throw(error_canister.throw_bigint, '3')
                };
            }
        },
        {
            name: 'throw boolean',
            test: async () => {
                return {
                    ok: await test_throw(error_canister.throw_boolean, 'false')
                };
            }
        },
        {
            name: 'throw class',
            test: async () => {
                return {
                    ok: await test_throw(
                        error_canister.throw_class,
                        'CustomClass toString'
                    )
                };
            }
        },
        {
            name: 'throw custom error',
            test: async () => {
                return {
                    ok: await test_throw(
                        error_canister.throw_custom_error,
                        'Error: This is a custom error'
                    )
                };
            }
        },
        {
            name: 'throw int',
            test: async () => {
                return {
                    ok: await test_throw(error_canister.throw_int, '3')
                };
            }
        },
        {
            name: 'throw null',
            test: async () => {
                return {
                    ok: await test_throw(error_canister.throw_null, 'null')
                };
            }
        },
        {
            name: 'throw null reference',
            test: async () => {
                return {
                    ok: await test_throw(
                        error_canister.throw_null_reference,
                        "TypeError: cannot convert 'null' or 'undefined' to object"
                    )
                };
            }
        },
        {
            name: 'throw object',
            test: async () => {
                return {
                    ok: await test_throw(
                        error_canister.throw_object,
                        '[object Object]'
                    )
                };
            }
        },
        {
            name: 'throw rational',
            test: async () => {
                return {
                    ok: await test_throw(error_canister.throw_rational, '3.14')
                };
            }
        },
        {
            name: 'throw string',
            test: async () => {
                return {
                    ok: await test_throw(
                        error_canister.throw_string,
                        'Hello World'
                    )
                };
            }
        },
        {
            name: 'throw symbol',
            test: async () => {
                return {
                    ok: await test_throw(
                        error_canister.throw_symbol,
                        'Symbol()'
                    )
                };
            }
        },
        {
            name: 'throw undefined',
            test: async () => {
                return {
                    ok: await test_throw(
                        error_canister.throw_undefined,
                        'undefined'
                    )
                };
            }
        }
    ];
}

async function test_throw(
    error_func: () => Promise<void>,
    expected_error: string
): Promise<boolean> {
    return check_error_message(
        await get_error_message(error_func),
        expected_error
    );
}

async function get_error_message(
    error_func: () => Promise<void>
): Promise<any> {
    try {
        await error_func();
    } catch (err) {
        return err;
    }
}

function check_error_message(actual_error: any, expected_error: string) {
    return (
        'result' in actual_error &&
        'reject_message' in actual_error.result &&
        actual_error.result.reject_message.includes(
            `AZLE RUNTIME ERROR: ${expected_error}`
        )
    );
}
