import { ActorSubclass } from '@dfinity/agent';
import { defaultPropTestParams, expect, it, Test } from 'azle/test';
import fc from 'fast-check';

import { CyclesResult } from '../src/types';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/intermediary/intermediary.did';

const TOLERANCE = 0n; // Tolerance for "close to" comparisons

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
    expect(isCloseTo(result.initialAvailable, amount)).toBe(true);

    switch (mode) {
        case 'all':
            expect(isCloseTo(result.accepted, result.initialAvailable)).toBe(
                true
            );
            break;
        case 'half':
            expect(
                isCloseTo(result.accepted, result.initialAvailable / 2n)
            ).toBe(true);
            break;
        case 'none':
            expect(isCloseTo(result.accepted, 0n)).toBe(true);
            break;
    }

    expect(
        isCloseTo(
            result.finalAvailable,
            result.initialAvailable - result.accepted
        )
    ).toBe(true);
    expect(isCloseTo(result.cyclesRefunded, result.finalAvailable)).toBe(true);
    expect(
        isCloseTo(
            result.endingCanisterBalance - result.startingCanisterBalance,
            result.accepted
        )
    ).toBe(true);
}

function isCloseTo(a: bigint, b: bigint): boolean {
    return (a > b ? a - b : b - a) <= TOLERANCE;
}
