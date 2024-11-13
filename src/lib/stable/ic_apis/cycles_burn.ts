/**
 * Burns cycles from the canister
 * @param amount The amount of cycles to burn
 * @returns The amount of cycles that were actually burned
 */
export function cyclesBurn(amount: bigint): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(
            globalThis._azleIcExperimental.cyclesBurn(amount.toString())
        );
    }

    return BigInt(globalThis._azleIcStable.cyclesBurn(amount.toString()));
}
