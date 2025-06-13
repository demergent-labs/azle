import { IDL, update } from 'azle';

let int32InitHeapStorage: { [key: string]: number | undefined } = {};

export class Int32Benchmarks {
    @update([IDL.Nat32])
    int32InitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: number = i % 2 === 0 ? 2_147_483_647 : 0;
            i += 1;
        }
    }

    @update([IDL.Nat32])
    int32InitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            int32InitHeapStorage[`element${i}`] =
                i % 2 === 0 ? 2_147_483_647 : 0;
            i += 1;
        }
    }
}
