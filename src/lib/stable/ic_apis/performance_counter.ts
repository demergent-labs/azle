/**
 * Gets the value of the specified performance counter.
 *
 * @param counterType - The type of performance counter:
 *   - 0: Instruction counter, returns the number of WebAssembly instructions executed since the start of the current message
 *   - 1: Call context instruction counter, returns the number of WebAssembly instructions executed since the start of the current call context
 *   - Other values will trap, but in the future the IC might support more performance counters
 * @returns The performance counter value as a bigint, or 0n if called outside the IC environment
 *
 * @remarks
 * - The instruction counters reset at the start of each message/call context
 * - Useful for optimizing canister execution and staying within instruction limits
 *
 * @example
 * // Check instructions used in current message
 * const messageInstructions = performanceCounter(0);
 *
 * // Check instructions used in current call context
 * const contextInstructions = performanceCounter(1);
 */
export function performanceCounter(counterType: number): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(
            globalThis._azleIcExperimental.performanceCounter(
                counterType.toString()
            )
        );
    }

    return BigInt(globalThis._azleIcStable.performanceCounter(counterType));
}
