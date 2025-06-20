import { IDL, update } from 'azle';

let heapStorage: { [key: string]: number | undefined } = {};

export class Nat8Benchmarks {
    @update([IDL.Nat32])
    nat8InitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: number = i % 2 === 0 ? 255 : 0;
            i += 1;
        }
    }

    @update([IDL.Nat32])
    nat8InitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            heapStorage[`element${i}`] = i % 2 === 0 ? 255 : 0;
            i += 1;
        }
    }

    @update
    nat8ClearHeapStorage(): void {
        heapStorage = {};
    }
}
