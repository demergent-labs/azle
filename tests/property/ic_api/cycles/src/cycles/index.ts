import {
    canisterBalance,
    IDL,
    msgCyclesAccept,
    msgCyclesAvailable,
    update
} from 'azle';

import { CyclesResult } from '../types';

export default class {
    @update([], CyclesResult)
    receiveAllCycles(): CyclesResult {
        return acceptCycles();
    }

    @update([IDL.Nat64], CyclesResult)
    receiveVariableCycles(receiveAmount: bigint): CyclesResult {
        return acceptCycles(receiveAmount);
    }

    @update([], CyclesResult)
    receiveNoCycles(): CyclesResult {
        return acceptCycles(0n);
    }

    @update([IDL.Nat64], CyclesResult)
    receiveCyclesByChunk(numChunks: bigint): CyclesResult {
        return acceptCycles(undefined, numChunks);
    }
}

function acceptCycles(
    receiveAmount?: bigint,
    numChunks?: bigint
): CyclesResult {
    const startingCanisterBalance = canisterBalance();
    const initialAvailable = msgCyclesAvailable();

    const effectiveNumChunks = numChunks ?? 1n;
    const chunkSize = receiveAmount ?? initialAvailable / effectiveNumChunks;
    const accepted = acceptCyclesRecursive(
        chunkSize,
        receiveAmount ?? initialAvailable,
        0n
    );

    const finalAvailable = msgCyclesAvailable();
    const endingCanisterBalance = canisterBalance();
    const cyclesRefunded = 0n; // This will always be 0 in the cycles canister

    return {
        initialAvailable,
        accepted,
        finalAvailable,
        startingCanisterBalance,
        endingCanisterBalance,
        cyclesRefunded
    };
}

function acceptCyclesRecursive(
    chunkSize: bigint,
    totalToAccept: bigint,
    accumulatedCycles: bigint
): bigint {
    if (msgCyclesAvailable() < chunkSize) {
        return accumulatedCycles;
    }

    if (accumulatedCycles >= totalToAccept) {
        return accumulatedCycles;
    }

    const newlyAccepted = msgCyclesAccept(chunkSize);
    return acceptCyclesRecursive(
        chunkSize,
        totalToAccept,
        accumulatedCycles + newlyAccepted
    );
}
