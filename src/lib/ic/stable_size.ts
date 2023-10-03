import { IDL } from '@dfinity/candid';

/**
 * Gets current size of the stable memory (in WASM pages)
 * @returns the current memory size
 */
export function stableSize(): number {
    return IDL.decode([IDL.Nat32], globalThis._azleIc.stableSize())[0];
}
