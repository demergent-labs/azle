import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

import { _SERVICE } from './dfx_generated/async_await/async_await.did';

export function getTests(async_await_canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('gets randomness when awaited once', async () => {
            const result = await async_await_canister.getRandomnessDirectly();

            expect(result).toHaveLength(32);
        });

        it('gets randomness even when there are multiple levels of awaits', async () => {
            const result = await async_await_canister.getRandomnessIndirectly();

            expect(result).toHaveLength(32);
        });

        it('gets randomness even when there are multiple awaits in multiple places at multiple levels', async () => {
            const result =
                await async_await_canister.getRandomnessSuperIndirectly();

            expect(result).toHaveLength(96);
        }, 10_000);

        it('is able to handle Promise<void>', async () => {
            const result = await async_await_canister.returnPromiseVoid();

            expect(result).toBeUndefined();
        });
    };
}
