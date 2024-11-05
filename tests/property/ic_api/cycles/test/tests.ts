import { getCanisterActor } from 'azle/test';
import { defaultPropTestParams, expect, it, Test } from 'azle/test';
import fc from 'fast-check';

import { CyclesResult } from '../src/types';
import { _SERVICE as Actor } from './dfx_generated/intermediary/intermediary.did';

export function getTests(): Test {
    return () => {
        it('should send all cycles from intermediary to cycles canister and receive none back', async () => {
            const intermediaryCanister =
                await getCanisterActor<Actor>('intermediary');
            await fc.assert(
                fc.asyncProperty(fc.bigInt(0n, 10_000_000n), async (amount) => {
                    const result =
                        await intermediaryCanister.sendAllCycles(amount);
                    validateCyclesResult(result, amount, 'all');
                }),
                defaultPropTestParams
            );
        });

        it('should send a portion of the cycles from intermediary to cycles canister and receive the rest back', async () => {
            const intermediaryCanister =
                await getCanisterActor<Actor>('intermediary');
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

        it('should receive all cycles back to the intermediary if none are received by the cycles canister', async () => {
            const intermediaryCanister =
                await getCanisterActor<Actor>('intermediary');
            await fc.assert(
                fc.asyncProperty(fc.bigInt(0n, 10_000_000n), async (amount) => {
                    const result =
                        await intermediaryCanister.sendNoCycles(amount);
                    validateCyclesResult(result, amount, 'none');
                }),
                defaultPropTestParams
            );
        });

        it('should send cycles in chunks from intermediary to cycles canister', async () => {
            const intermediaryCanister =
                await getCanisterActor<Actor>('intermediary');
            await fc.assert(
                fc.asyncProperty(
                    fc.bigInt(0n, 10_000_000n),
                    fc.bigInt(1n, 10n),
                    async (amount, numChunks) => {
                        const result =
                            await intermediaryCanister.sendCyclesByChunk(
                                amount,
                                numChunks
                            );

                        validateCyclesResult(result, amount, 'all');
                    }
                ),
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
