import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

// @ts-ignore
import { _SERVICE } from './dfx_generated/counter/counter.did';

export function getTests(counterCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('gets the counter amount', async () => {
            const result = await counterCanister.get();

            expect(result).toBe(0n);
        });

        it('sets the counter amount', async () => {
            const result = await counterCanister.set(10n);

            expect(result).toBe(undefined);
        });

        it('increments the counter', async () => {
            const result = await counterCanister.inc();

            expect(result).toBe(undefined);
        });

        it('increments the counter a second time', async () => {
            const result = await counterCanister.inc();

            expect(result).toBe(undefined);
        });

        it('maintains its state between calls', async () => {
            const result = await counterCanister.get();

            expect(result).toBe(12n);
        });
    };
}
