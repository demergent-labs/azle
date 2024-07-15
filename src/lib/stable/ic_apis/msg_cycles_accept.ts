/**
 * Moves cycles from the call to the canister balance
 * @param maxAmount the max amount of cycles to move
 * @returns the actual amount moved
 */
export function msgCyclesAccept(maxAmount: bigint): bigint {
    if (globalThis._azleIc === undefined) {
        return 0n;
    }

    const msgCyclesAcceptAmountMovedString = globalThis._azleIc.msgCyclesAccept(
        maxAmount.toString()
    );

    return BigInt(msgCyclesAcceptAmountMovedString);
}
