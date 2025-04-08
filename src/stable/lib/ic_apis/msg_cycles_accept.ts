/**
 * Moves up to `maxAmount` of the available cycles from the current call to the canister cycle balance.
 *
 * @param maxAmount - Maximum number of cycles to accept from the available cycles. Represented as a u128 (max size 2^128 - 1)
 *
 * @returns The actual amount of cycles accepted. Represented as a u128 (max size 2^128 - 1)
 *
 * @remarks
 *
 * - **Call Context**:
 *   - \@update
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 */
export function msgCyclesAccept(maxAmount: bigint): bigint {
    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(
            globalThis._azleIcExperimental.msgCyclesAccept(maxAmount.toString())
        );
    }

    if (globalThis._azleIc !== undefined) {
        return BigInt(globalThis._azleIc.msgCyclesAccept(maxAmount.toString()));
    }

    return 0n;
}
