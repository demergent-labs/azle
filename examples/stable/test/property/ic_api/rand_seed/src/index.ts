import { IDL, randSeed, update } from 'azle';

export default class {
    @update([IDL.Vec(IDL.Nat8)])
    seed(seed: Uint8Array): void {
        randSeed(seed);
    }

    @update([IDL.Nat32], IDL.Vec(IDL.Nat8))
    cryptoGetRandomValues(length: number): Uint8Array {
        let array = new Uint8Array(length);

        crypto.getRandomValues(array);

        return array;
    }
}
