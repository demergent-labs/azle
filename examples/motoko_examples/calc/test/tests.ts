import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

// @ts-ignore
import { _SERVICE } from './dfx_generated/calc/calc.did';

export function getTests(calcCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('adds 5', async () => {
            const result = await calcCanister.add(5n);

            expect(result).toBe(5n);
        });
        it('subtracts 2', async () => {
            const result = await calcCanister.sub(2n);

            expect(result).toBe(3n);
        });
        it('multiplies by 6', async () => {
            const result = await calcCanister.mul(6n);

            expect(result).toBe(18n);
        });
        it('divides by 2', async () => {
            const result = await calcCanister.div(2n);

            expect(result).toStrictEqual([9n]);
        });
        it('clears state', async () => {
            const result = await calcCanister.clearall();

            expect(result).toBeUndefined();
        });
        it('adds 0', async () => {
            const result = await calcCanister.add(0n);

            expect(result).toBe(0n);
        });
    };
}
