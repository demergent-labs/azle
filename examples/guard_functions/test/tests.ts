import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/guard_functions/guard_functions.did';

export function get_tests(
    guard_functions_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'loosely guarded function',
            test: async () => {
                const result = await guard_functions_canister.loosely_guarded();

                return { ok: result === true };
            }
        },
        {
            name: 'tightly guarded function',
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
