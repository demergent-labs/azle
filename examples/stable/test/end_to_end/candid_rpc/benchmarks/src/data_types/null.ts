import { IDL, update } from 'azle';

let heapStorage: { [key: string]: null | undefined } = {};

export class NullBenchmarks {
    @update([IDL.Nat32])
    nullInitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: null = i % 2 === 0 ? null : null;
            i += 1;
        }
    }

    @update([IDL.Nat32])
    nullInitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            heapStorage[`element${i}`] = i % 2 === 0 ? null : null;
            i += 1;
        }
    }

    @update
    nullClearHeapStorage(): void {
        heapStorage = {};
    }
}
