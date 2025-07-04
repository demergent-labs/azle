import { IDL, update } from 'azle';

let heapStorage: { [key: string]: number | undefined } = {};

export class Int16Benchmarks {
    @update([IDL.Nat32])
    int16InitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: number = i % 2 === 0 ? 32_767 : 0;
            i += 1;
        }
    }

    @update([IDL.Nat32])
    int16InitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            heapStorage[`element${i}`] = i % 2 === 0 ? 32_767 : 0;
            i += 1;
        }
    }

    @update
    int16ClearHeapStorage(): void {
        heapStorage = {};
    }
}
