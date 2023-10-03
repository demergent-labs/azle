import { IDL } from '@dfinity/candid';

/**
 * Gets current size of the stable memory (in WASM pages). Supports 64-bit
 * addressed memory.
 * @returns the current memory size
 */
export function stable64Size(): bigint {
    return IDL.decode([IDL.Nat64], globalThis._azleIc.stable64Size())[0];
}
