/**
 * Gets a copy of stable memory
 *
 * **Note:** This will map the whole memory, even if not all of it has
 * been written to.
 * @returns a copy of the stable memory
 */
export function stableBytes(): Uint8Array {
    return new Uint8Array(
        globalThis._azleIc ? globalThis._azleIc.stableBytes() : []
    );
}
