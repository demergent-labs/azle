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

    const requestedAmount = receiveAmount ?? initialAvailable;

    const chunkSize =
        requestedAmount > 0n
            ? bigintMax(1n, requestedAmount / effectiveNumChunks)
            : 0n;

    const accepted = acceptCyclesRecursive(chunkSize, requestedAmount, 0n);

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
    if (msgCyclesAvailable() <= 0n) {
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

function bigintMax(a: bigint, b: bigint): bigint {
    return a > b ? a : b;
}
