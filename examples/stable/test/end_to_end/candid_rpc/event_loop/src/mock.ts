import { IDL, update } from 'azle';

export default class {
    @update([IDL.Vec(IDL.Nat8)], IDL.Vec(IDL.Nat8))
    test(bytes: Uint8Array): Uint8Array {
        for (let i = 0; i < 50_000_000; i++) {
            // do nothing
        }

        return bytes;
    }
}
