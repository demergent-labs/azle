import { IDL, update } from 'azle';

let heapStorage: { [key: string]: number | undefined } = {};

export class Nat16Benchmarks {
    @update([IDL.Nat32])
    nat16InitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: number = i % 2 === 0 ? 65_535 : 0;
            i += 1;
        }
    }

    @update([IDL.Nat32])
    nat16InitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            heapStorage[`element${i}`] = i % 2 === 0 ? 65_535 : 0;
            i += 1;
        }
    }

    @update
    nat16ClearHeapStorage(): void {
        heapStorage = {};
    }
}
