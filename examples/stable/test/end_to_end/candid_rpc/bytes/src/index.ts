import { IDL, update } from 'azle';

export default class {
    @update([IDL.Vec(IDL.Nat8)], IDL.Vec(IDL.Nat8))
    getBytes(bytes: Uint8Array): Uint8Array {
        return bytes;
    }
}
