import { ActorSubclass } from '@dfinity/agent';
import { defaultPropTestParams, expect, it, Test } from 'azle/test';
import fc from 'fast-check';

import { CyclesResult } from '../src/types';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/intermediary/intermediary.did';

export function getTests(intermediaryCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('should handle sendAllCycles correctly', async () => {
            await fc.assert(
                fc.asyncProperty(fc.bigInt(1n, 10_000_000n), async (amount) => {
                    const result =
                        await intermediaryCanister.sendAllCycles(amount);
                    validateCyclesResult(result, amount, 'all');
                }),
                defaultPropTestParams
            );
        });

        it('should handle sendHalfCycles correctly', async () => {
            await fc.assert(
                fc.asyncProperty(fc.bigInt(1n, 10_000_000n), async (amount) => {
                    const result =
                        await intermediaryCanister.sendHalfCycles(amount);
                    validateCyclesResult(result, amount, 'half');
                }),
                defaultPropTestParams
            );
        });

        it('should handle sendNoCycles correctly', async () => {
            await fc.assert(
                fc.asyncProperty(fc.bigInt(1n, 10_000_000n), async (amount) => {
                    const result =
                        await intermediaryCanister.sendNoCycles(amount);
                    validateCyclesResult(result, amount, 'none');
                }),
                defaultPropTestParams
            );
        });

        it('should handle sendCyclesManual correctly', async () => {
            await fc.assert(
                fc.asyncProperty(fc.bigInt(1n, 10_000_000n), async (amount) => {
                    const result =
                        await intermediaryCanister.sendCyclesManual(amount);
                    expect(typeof result).toBe('bigint');
                    expect(result).toBeGreaterThanOrEqual(0n);
                    expect(result).toBeLessThanOrEqual(amount);
                }),
                defaultPropTestParams
            );
        });
    };
}

function validateCyclesResult(
    result: CyclesResult,
    amount: bigint,
    mode: 'all' | 'half' | 'none'
): void {
    expect(result.initialAvailable).toBe(amount);

    if (mode === 'all') {
        expect(result.accepted).toBe(result.initialAvailable);
    }
    if (mode === 'half') {
        expect(result.accepted).toBe(result.initialAvailable / 2n);
    }
    if (mode === 'none') {
        expect(result.accepted).toBe(0n);
    }

    expect(result.finalAvailable).toBe(
        result.initialAvailable - result.accepted
    );
    expect(result.cyclesRefunded).toBe(result.finalAvailable);
    expect(result.endingCanisterBalance - result.startingCanisterBalance).toBe(
        result.accepted
    );
}
