import { IDL } from '@dfinity/candid';

/**
 * Returns the amount of cycles that came back with the response as a refund.
 * The refund has already been added to the canister balance automatically.
 * @returns the amount of cycles
 */
export function msgCyclesRefunded() {
    const msgCyclesRefundedCandidBytes = globalThis._azleIc.msgCyclesRefunded();

    return IDL.decode([IDL.Nat64], msgCyclesRefundedCandidBytes)[0];
}
