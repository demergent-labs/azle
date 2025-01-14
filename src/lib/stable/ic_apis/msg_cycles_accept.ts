/**
 * Moves up to `maxAmount` of the available cycles from the current call to the canister cycle balance.
 *
 * @param maxAmount - Maximum number of cycles to accept from the available cycles
 *
 * @returns The actual amount of cycles accepted
 *
 * @remarks
 *
 * - **Call Context**:
 *   - \@update
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 */
export function msgCyclesAccept(maxAmount: bigint): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(
            globalThis._azleIcExperimental.msgCyclesAccept(maxAmount.toString())
        );
    }

    return BigInt(
        globalThis._azleIcStable.msgCyclesAccept(maxAmount.toString())
    );
}
