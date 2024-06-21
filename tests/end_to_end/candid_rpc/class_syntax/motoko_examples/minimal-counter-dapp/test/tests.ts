import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

// @ts-ignore
import { _SERVICE } from '../src/declarations/minimal_dapp/minimal_dapp.did';

export function getTests(counterCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('gets an initial count', async () => {
            const result = await counterCanister.getCount();

            expect(result).toBe(0n);
        });

        it('increments the counter once', async () => {
            const result = await counterCanister.count();

            expect(result).toBe(1n);
        });

        it('increments the counter twice', async () => {
            const result = await counterCanister.count();

            expect(result).toBe(2n);
        });

        it("gets the value of the counter after it's been incremented", async () => {
            const result = await counterCanister.getCount();

            expect(result).toBe(2n);
        });

        it('resets the counter', async () => {
            const result = await counterCanister.reset();

            expect(result).toBe(0n);
        });

        it('gets the value of the counter after reset', async () => {
            const result = await counterCanister.getCount();

            expect(result).toBe(0n);
        });

        it('increments the counter once after reset', async () => {
            const result = await counterCanister.count();

            expect(result).toBe(1n);
        });

        it('gets the value of the counter after first increment after reset', async () => {
            const result = await counterCanister.getCount();

            expect(result).toBe(1n);
        });
    };
}
