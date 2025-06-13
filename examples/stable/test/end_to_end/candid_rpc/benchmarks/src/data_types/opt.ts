import { IDL, update } from 'azle';

let optInitHeapStorage: { [key: string]: [boolean] | [] | undefined } = {};

export class OptBenchmarks {
    @update([IDL.Nat32])
    optInitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: [boolean] | [] = i % 2 === 0 ? [true] : [];
            i += 1;
        }
    }

    @update([IDL.Nat32])
    optInitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            optInitHeapStorage[`element${i}`] = i % 2 === 0 ? [true] : [];
            i += 1;
        }
    }
}
