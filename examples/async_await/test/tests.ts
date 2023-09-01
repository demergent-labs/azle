import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/async_await/async_await.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    async_await_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'get_randomness_directly',
            test: async () => {
                const result =
                    await async_await_canister.getRandomnessDirectly();

                return {
                    Ok: result.length === 32
                };
            }
        },
        {
            name: 'get_randomness_indirectly',
            test: async () => {
                const result =
                    await async_await_canister.getRandomnessIndirectly();

                return {
                    Ok: result.length === 32
                };
            }
        },
        {
            name: 'get_randomness_super_indirectly',
            test: async () => {
                const result =
                    await async_await_canister.getRandomnessSuperIndirectly();

                return {
                    Ok: result.length === 96
                };
            }
        },
        {
            name: 'return promise void',
            test: async () => {
                const result = await async_await_canister.returnPromiseVoid();

                return {
                    Ok: result === undefined
                };
            }
        }
    ];
}
