import { IDL, update } from 'azle';

let heapStorage: { [key: string]: boolean | undefined } = {};

export class BoolBenchmarks {
    @update([IDL.Nat32])
    boolInitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: boolean = i % 2 === 0 ? true : false;
            i += 1;
        }
    }

    @update([IDL.Nat32])
    boolInitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            heapStorage[`element${i}`] = i % 2 === 0 ? true : false;
            i += 1;
        }
    }

    @update
    boolClearHeapStorage(): void {
        heapStorage = {};
    }
}
