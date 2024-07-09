/**
 * Attempts to grow the stable memory by `newPages`.
 * @param newPages
 * @returns the previous size that was reserved.
 */
export function stableGrow(newPages: number): number {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    return Number(globalThis._azleIc.stableGrow(newPages.toString()));
}
