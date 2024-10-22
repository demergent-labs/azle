import {
    canisterBalance,
    IDL,
    msgCyclesAccept,
    msgCyclesAvailable,
    reply,
    update
} from 'azle';

import { CyclesResult, CyclesResultIDL } from '../types';

export default class {
    @update([], CyclesResultIDL)
    receiveAllCycles(): CyclesResult {
        return acceptCycles((available) => available);
    }

    @update([], CyclesResultIDL)
    receiveHalfCycles(): CyclesResult {
        return acceptCycles((available) => available / 2n);
    }

    @update([], CyclesResultIDL)
    receiveNoCycles(): CyclesResult {
        return acceptCycles(() => 0n);
    }

    // TODO we could have fun playing with the constraints of msgCyclesAccept
    // TODO like making sure it doesn't trap, or that it can be called multiple times
    // TODO or what happens if it accepts more than is available, or it it tries to accept more than the max_amount

    @update([], IDL.Nat64, { manual: true })
    receiveCyclesManual(): void {
        const msgCyclesAvailableResult = msgCyclesAvailable();
        reply({ data: msgCyclesAvailableResult, idlType: IDL.Nat64 });
        // const remainingCycles = msgCyclesAvailable();
        // if (remainingCycles !== 0n) {
        //     // TODO what will happen if we throw after we already replied?
        //     // TODO we probably don't need to tests this as part of the property tests
        //     // TODO but if we do should we do this same test but with reject?
        //     throw new Error(
        //         `msgCyclesAvailable() !== 0. Actual value: ${remainingCycles}. Initial msgCyclesAvailable result: ${msgCyclesAvailableResult}`
        //     );
        // }
    }
}

function acceptCycles(
    getAcceptAmount: (available: bigint) => bigint
): CyclesResult {
    const startingCanisterBalance = canisterBalance();
    const initialAvailable = msgCyclesAvailable();
    const accepted = msgCyclesAccept(getAcceptAmount(initialAvailable));
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
