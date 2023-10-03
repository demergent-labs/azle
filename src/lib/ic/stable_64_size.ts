import { IDL } from '@dfinity/candid';

export function stable64Size() {
    return IDL.decode([IDL.Nat64], globalThis._azleIc.stable64Size())[0];
}
