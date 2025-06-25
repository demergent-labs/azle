import { IDL, update } from 'azle';

let heapStorage: { [key: string]: number[] | undefined } = {};

export class VecBenchmarks {
    @update([IDL.Nat32])
    vecInitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: number[] =
                i % 2 === 0 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [];
            i += 1;
        }
    }

    @update([IDL.Nat32])
    vecInitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            heapStorage[`element${i}`] =
                i % 2 === 0 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [];
            i += 1;
        }
    }

    @update
    vecClearHeapStorage(): void {
        heapStorage = {};
    }
}
