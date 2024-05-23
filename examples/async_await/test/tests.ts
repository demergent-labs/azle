import { ActorSubclass } from '@dfinity/agent';
import { equals, Test } from 'azle/test';

import { _SERVICE } from './dfx_generated/async_await/async_await.did';

export function get_tests(
    async_await_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'get 32 bytes of randomness from get_randomness_directly',
            test: async () => {
                const result =
                    await async_await_canister.getRandomnessDirectly();

                const expectedLen = 32;

                return equals(result.length, expectedLen);
            }
        },
        {
            name: 'get 32 bytes of randomness from get_randomness_indirectly',
            test: async () => {
                const result =
                    await async_await_canister.getRandomnessIndirectly();

                const expectedLen = 32;

                return equals(result.length, expectedLen);
            }
        },
        {
            name: 'get 96 bytes of randomness from get_randomness_super_indirectly',
            test: async () => {
                const result =
                    await async_await_canister.getRandomnessSuperIndirectly();

                const expectedLen = 96;

                return equals(result.length, expectedLen);
            }
        },
        {
            name: 'return promise void',
            test: async () => {
                const result = await async_await_canister.returnPromiseVoid();

                return equals(result, undefined);
            }
        }
    ];
}
