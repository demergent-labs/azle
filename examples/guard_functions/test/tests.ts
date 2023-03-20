import { ActorSubclass } from '@dfinity/agent';
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
                    return { ok: true };
                }
            }
        }
    ];
}
