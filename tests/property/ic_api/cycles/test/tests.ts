import { getCanisterActor } from 'azle/test';
import { defaultPropTestParams, expect, it, Test } from 'azle/test';
import fc from 'fast-check';

import { CyclesResult } from '../src/types';
import { _SERVICE } from './dfx_generated/intermediary/intermediary.did';

export function getTests(): Test {
    return () => {
        it('should handle sendAllCycles correctly', async () => {
            const intermediaryCanister =
                await getCanisterActor<_SERVICE>('intermediary');
            await fc.assert(
                fc.asyncProperty(fc.bigInt(0n, 10_000_000n), async (amount) => {
                    const result =
                        await intermediaryCanister.sendAllCycles(amount);
                    validateCyclesResult(result, amount, 'all');
                }),
                defaultPropTestParams
            );
        });

        it('should handle sendVariableCycles correctly', async () => {
            const intermediaryCanister =
                await getCanisterActor<_SERVICE>('intermediary');
            await fc.assert(
                fc.asyncProperty(
                    fc.bigInt(0n, 10_000_000n),
                    fc.bigInt(0n, 10_000_000n),
                    async (amountToSend, amountToAccept) => {
                        const result =
                            await intermediaryCanister.sendVariableCycles(
                                amountToSend,
                                amountToAccept
                            );
                        validateCyclesResult(
                            result,
                            amountToSend,
                            'variable',
                            amountToAccept
                        );
                    }
                ),
                defaultPropTestParams
            );
        });

        it('should handle sendNoCycles correctly', async () => {
            const intermediaryCanister =
                await getCanisterActor<_SERVICE>('intermediary');
            await fc.assert(
                fc.asyncProperty(fc.bigInt(0n, 10_000_000n), async (amount) => {
                    const result =
                        await intermediaryCanister.sendNoCycles(amount);
                    validateCyclesResult(result, amount, 'none');
                }),
                defaultPropTestParams
            );
        });
    };
}

function validateCyclesResult(
    result: CyclesResult,
    amountToSend: bigint,
    mode: 'all' | 'variable' | 'none',
    amountToAccept?: bigint
): void {
    expect(result.initialAvailable).toBe(amountToSend);

    if (mode === 'all') {
        expect(result.accepted).toBe(result.initialAvailable);
    }
    if (mode === 'variable') {
        if (amountToAccept === undefined) {
            throw new Error('amountToAccept is required for variable mode');
        }
        const accepted =
            amountToSend < amountToAccept ? amountToSend : amountToAccept;
        expect(result.accepted).toBe(accepted);
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
