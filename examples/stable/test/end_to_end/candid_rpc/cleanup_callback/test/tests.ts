import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/_internal/test';

import { _SERVICE } from './dfx_generated/cleanup_callback/cleanup_callback.did';

export function getTests(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('gets randomness when awaited once', async () => {
            const result = await canister.getRandomnessDirectly();

            expect(result).toHaveLength(32);
        });

        it('gets randomness even when there are multiple levels of awaits', async () => {
            const result = await canister.getRandomnessIndirectly();

            expect(result).toHaveLength(32);
        });

        it('gets randomness even when there are multiple awaits in multiple places at multiple levels', async () => {
            const result = await canister.getRandomnessSuperIndirectly();

            expect(result).toHaveLength(96);
        });

        it('is able to handle Promise<void>', async () => {
            const result = await canister.returnPromiseVoid();

            expect(result).toBeUndefined();
        });
    };
}
