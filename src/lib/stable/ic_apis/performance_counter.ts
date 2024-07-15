/**
 * Gets the value of the specified performance counter
 *
 * @param counterType the type of performance counter to use. Currently `0`
 * (instruction counter) is the only supported type. It returns the number
 * of WebAssembly instructions the system has determined that the canister
 * has executed.
 * @returns the performance counter metric
 */
export function performanceCounter(counterType: number): bigint {
    if (globalThis._azleIc === undefined) {
        return 0n;
    }

    return BigInt(
        globalThis._azleIc.performanceCounter(counterType.toString())
    );
}
