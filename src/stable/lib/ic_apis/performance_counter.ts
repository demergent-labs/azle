/**
 * Returns the value of the specified performance counter.
 *
 * @param counterType - A supported performance counter type. The available types are:
 *   - 0: current execution instruction counter. The number of WebAssembly instructions the canister has executed since the beginning of the current message execution
 *   - 1: call context instruction counter. The number of WebAssembly instructions the canister has executed within the call context of the current message execution since call context creation. The counter monotonically increases across all message executions in the call context until the corresponding call context is removed.
 *
 * @returns The performance counter value. Represented as a u64 (max size 2^64 - 1)
 *
 * @remarks
 *
 *  - Consider using `counterType` `1` in most cases; it measures across inter-canister awaits
 *
 * - **Call Context**:
 *   - any
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

    return globalThis._azleIcStable.performanceCounter(counterType);
}
