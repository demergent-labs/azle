import {
    canisterBalance,
    IDL,
    msgCyclesAccept,
    msgCyclesAvailable,
    update
} from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

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

    @update([IDL.Nat64], IDL.Bool)
    assertMsgCyclesAcceptTypes(amount: bigint): boolean {
        type _AssertParamType = AssertType<
            NotAnyAndExact<Parameters<typeof msgCyclesAccept>[0], bigint>
        >;
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof msgCyclesAccept>, bigint>
        >;
        return (
            typeof amount === 'bigint' &&
            typeof msgCyclesAccept(amount) === 'bigint'
        );
    }

    @update([], IDL.Bool)
    assertMsgCyclesAvailableTypes(): boolean {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof msgCyclesAvailable>, bigint>
        >;
        return typeof msgCyclesAvailable() === 'bigint';
    }
}

function acceptCycles(
    receiveAmount?: bigint,
    numChunks?: bigint
): CyclesResult {
    const startingCanisterBalance = canisterBalance();
    const initialAvailable = msgCyclesAvailable();
    const acceptAmount = receiveAmount ?? initialAvailable;
    const accepted =
        numChunks !== undefined
            ? acceptCyclesChunk(
                  acceptAmount / numChunks === 0n
                      ? 1n
                      : acceptAmount / numChunks,
                  acceptAmount,
                  0n
              )
            : msgCyclesAccept(acceptAmount);
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
