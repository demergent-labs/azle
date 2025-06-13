import { IDL, update } from 'azle';

let nat32InitHeapStorage: { [key: string]: number | undefined } = {};

export class Nat32Benchmarks {
    @update([IDL.Nat32])
    nat32InitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: number = i % 2 === 0 ? 4_294_967_295 : 0;
            i += 1;
        }
    }

    @update([IDL.Nat32])
    nat32InitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            nat32InitHeapStorage[`element${i}`] =
                i % 2 === 0 ? 4_294_967_295 : 0;
            i += 1;
        }
    }
}
