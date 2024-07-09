/**
 * Gets current size of the stable memory (in WASM pages)
 * @returns the current memory size
 */
export function stableSize(): number {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    return Number(globalThis._azleIc.stableSize());
}
