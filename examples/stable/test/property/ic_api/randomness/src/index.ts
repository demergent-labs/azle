import { IDL, update } from 'azle';

export default class {
    @update([IDL.Nat32], IDL.Vec(IDL.Nat8))
    cryptoGetRandomValues(length: number): Uint8Array {
        const buffer = new Uint8Array(length);

        crypto.getRandomValues(buffer);

        return buffer;
    }
}
