import { IDL, update } from 'azle';

let heapStorage: { [key: string]: string | undefined } = {};

export class TextBenchmarks {
    @update([IDL.Nat32])
    textInitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: string = i % 2 === 0 ? 'hello' : '';
            i += 1;
        }
    }

    @update([IDL.Nat32])
    textInitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            heapStorage[`element${i}`] = i % 2 === 0 ? 'hello' : '';
            i += 1;
        }
    }

    @update
    textClearHeapStorage(): void {
        heapStorage = {};
    }
}
