import { ActorSubclass } from '@dfinity/agent';
import { AgentError } from '@dfinity/agent/lib/cjs/errors';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/guard_functions/guard_functions.did';

export function get_tests(
    guard_functions_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'identifier_annotation',
            test: async () => {
                const result =
                    await guard_functions_canister.identifier_annotation();

                return { ok: result };
            }
        },
        {
            name: 'call_expression_without_options_object',
            test: async () => {
                const result =
                    await guard_functions_canister.call_expression_without_options_object();

                return { ok: result };
            }
        },
        {
            name: 'call_expression_with_empty_options_object',
            test: async () => {
                const result =
                    await guard_functions_canister.call_expression_with_empty_options_object();

                return { ok: result };
            }
        },
        {
            name: 'loosely_guarded',
            test: async () => {
                const result = await guard_functions_canister.loosely_guarded();

                return { ok: result };
            }
        },
        {
            name: 'loosely_guarded_with_guard_option_key_as_string',
            test: async () => {
                const result =
                    await guard_functions_canister.loosely_guarded_with_guard_option_key_as_string();

                return { ok: result };
            }
        },
        {
            name: 'tightly_guarded',
            test: async () => {
                try {
                    const result =
                        await guard_functions_canister.tightly_guarded();
                    return {
                        err: 'Expected tightly_guarded function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
                            `"Message": "Execution halted by \\"allow_none\\" guard function"`
                        )
                    };
                }
            }
        },
        {
            name: 'error_string_guarded',
            test: async () => {
                try {
                    const result =
                        await guard_functions_canister.error_string_guarded();
                    return {
                        err: 'Expected error_string_guarded function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
                            `Uncaught Execution halted by \\"throw_string\\" guard function`
                        )
                    };
                }
            }
        },
        {
            name: 'custom_error_guarded',
            test: async () => {
                try {
                    const result =
                        await guard_functions_canister.custom_error_guarded();
                    return {
                        err: 'Expected custom_error_guarded function to throw'
                    };
                } catch (error) {
                    // TODO: I actually expect this to say "Uncaught CustomError: Execution..."
                    // Why it only says "Error" not "CustomError" I don't understand.
                    return {
                        ok: (error as AgentError).message.includes(
                            `Uncaught Error: Execution halted by \\"throw_custom_error\\" guard function`
                        )
                    };
                }
            }
        },
        {
            name: 'invalid_return_type_guarded',
            test: async () => {
                try {
                    const result =
                        await guard_functions_canister.invalid_return_type_guarded();
                    return {
                        err: 'Expected invalid_return_type_guarded function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
                            `TypeError: value is not a GuardResult`
                        )
                    };
                }
            }
        },
        {
            name: 'bad_object_guarded',
            test: async () => {
                try {
                    const result =
                        await guard_functions_canister.bad_object_guarded();
                    return {
                        err: 'Expected bad_object_guarded function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
                            `TypeError: value is not a GuardResult`
                        )
                    };
                }
            }
        },
        {
            name: 'non_null_ok_value_guarded',
            test: async () => {
                try {
                    const result =
                        await guard_functions_canister.non_null_ok_value_guarded();
                    return {
                        err: 'Expected non_null_ok_value_guarded function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
                            `TypeError: value is not null`
                        )
                    };
                }
            }
        },
        {
            name: 'non_string_err_value_guarded',
            test: async () => {
                try {
                    const result =
                        await guard_functions_canister.non_string_err_value_guarded();
                    return {
                        err: 'Expected non_string_err_value_guarded function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
                            `TypeError: value is not a string`
                        )
                    };
                }
            }
        }
    ];
}
