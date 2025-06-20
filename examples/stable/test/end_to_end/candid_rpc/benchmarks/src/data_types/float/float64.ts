import { IDL, update } from 'azle';

let heapStorage: { [key: string]: number | undefined } = {};

export class Float64Benchmarks {
    @update([IDL.Nat32])
    float64InitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: number = i % 2 === 0 ? Math.PI : Math.E;
            i += 1;
        }
    }

    @update([IDL.Nat32])
    float64InitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            heapStorage[`element${i}`] = i % 2 === 0 ? Math.PI : Math.E;
            i += 1;
        }
    }

    @update
    float64ClearHeapStorage(): void {
        heapStorage = {};
    }
}
