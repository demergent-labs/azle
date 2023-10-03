import { IDL } from '@dfinity/candid';

export function stableSize() {
    return IDL.decode([IDL.Nat32], globalThis._azleIc.stableSize())[0];
}
