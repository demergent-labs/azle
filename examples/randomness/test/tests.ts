import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { execSync } from 'child_process';
import { _SERVICE } from './dfx_generated/randomness/randomness.did';

let global_results: Set<string> = new Set();

export function get_tests(
    randomness_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'first round',
            test: async () => {
                const math_random_call_0_result =
                    await randomness_canister.math_random();
                const math_random_call_1_result =
                    await randomness_canister.math_random();
                const math_random_call_2_result =
                    await randomness_canister.math_random();
                const math_random_call_3_result =
                    await randomness_canister.math_random();
                const math_random_call_4_result =
                    await randomness_canister.math_random();

                const results = [
                    math_random_call_0_result.toString(),
                    math_random_call_1_result.toString(),
                    math_random_call_2_result.toString(),
                    math_random_call_3_result.toString(),
                    math_random_call_4_result.toString()
                ];

                for (const result of results) {
                    global_results.add(result);
                }

                return {
                    ok: global_results.size === 5
                };
            }
        },
        {
            name: 'dfx deploy',
            prep: async () => {
                execSync('dfx deploy');
            }
        },
        {
            name: 'second round',
            test: async () => {
                const math_random_call_0_result =
                    await randomness_canister.math_random();
                const math_random_call_1_result =
                    await randomness_canister.math_random();
                const math_random_call_2_result =
                    await randomness_canister.math_random();
                const math_random_call_3_result =
                    await randomness_canister.math_random();
                const math_random_call_4_result =
                    await randomness_canister.math_random();

                const results = [
                    math_random_call_0_result.toString(),
                    math_random_call_1_result.toString(),
                    math_random_call_2_result.toString(),
                    math_random_call_3_result.toString(),
                    math_random_call_4_result.toString()
                ];

                for (const result of results) {
                    global_results.add(result);
                }

                return {
                    ok: global_results.size === 10
                };
            }
        }
    ];
}
