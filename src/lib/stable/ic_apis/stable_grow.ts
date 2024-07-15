/**
 * Attempts to grow the stable memory by `newPages`.
 * Supports 64-bit addressed memory.
 * @param newPages
 * @returns the previous size that was reserved.
 */
export function stableGrow(newPages: bigint): bigint {
    if (globalThis._azleIc === undefined) {
        return 0n;
    }

    return BigInt(globalThis._azleIc.stableGrow(newPages.toString()));
}
