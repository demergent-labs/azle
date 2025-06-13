import { IDL, update } from 'azle';

let blobInitHeapStorage: { [key: string]: Uint8Array | undefined } = {};

export class BlobBenchmarks {
    @update([IDL.Nat32])
    blobInitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: Uint8Array =
                i % 2 === 0
                    ? Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                    : Uint8Array.from([]);
            i += 1;
        }
    }

    @update([IDL.Nat32])
    blobInitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            blobInitHeapStorage[`element${i}`] =
                i % 2 === 0
                    ? Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                    : Uint8Array.from([]);
            i += 1;
        }
    }
}
