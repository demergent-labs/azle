import { IDL, query, update } from 'azle';

export default class {
    @update([IDL.Vec(IDL.Nat8)], IDL.Vec(IDL.Nat8))
    getBytes(bytes) {
        return bytes;
    }
}
