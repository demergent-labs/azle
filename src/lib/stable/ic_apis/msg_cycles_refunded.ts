/**
 * Returns the amount of cycles that came back with the response as a refund.
 * The refund has already been added to the canister balance automatically.
 * @returns the amount of cycles
 */
export function msgCyclesRefunded(): bigint {
    if (globalThis._azleIcStable === undefined) {
        return 0n;
    }

    return BigInt(globalThis._azleIcStable.msgCyclesRefunded());
}
