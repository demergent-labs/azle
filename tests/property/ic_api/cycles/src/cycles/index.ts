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

    // TODO Future work: Make sure it doesn't trap, or that it can be called multiple times
}

function acceptCycles(receiveAmount?: bigint): CyclesResult {
    const startingCanisterBalance = canisterBalance();
    const initialAvailable = msgCyclesAvailable();
    const accepted = msgCyclesAccept(receiveAmount ?? initialAvailable);
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
