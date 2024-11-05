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
    const accepted = acceptCyclesStrategy(
        receiveAmount ?? initialAvailable,
        numChunks
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

function acceptCyclesStrategy(
    receiveAmount: bigint,
    numChunks?: bigint
): bigint {
    if (numChunks === undefined) {
        return msgCyclesAccept(receiveAmount);
    }
    const chunkSize = bigintMax(1n, receiveAmount / numChunks);
    return acceptCyclesChunk(chunkSize, receiveAmount, 0n);
}

function acceptCyclesChunk(
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
    return acceptCyclesChunk(
        chunkSize,
        totalToAccept,
        accumulatedCycles + newlyAccepted
    );
}

function bigintMax(a: bigint, b: bigint): bigint {
    return a > b ? a : b;
}
