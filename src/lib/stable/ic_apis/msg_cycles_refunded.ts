/**
 * Returns the amount of cycles that came back with the response as a refund.
 * The refund has already been added to the canister balance automatically.
 * @returns the amount of cycles
 */
export function msgCyclesRefunded(): bigint {
    if (globalThis._azleIc === undefined) {
        return 0n;
    }

    const msgCyclesRefundedAmountString =
        globalThis._azleIc.msgCyclesRefunded();

    return BigInt(msgCyclesRefundedAmountString);
}
