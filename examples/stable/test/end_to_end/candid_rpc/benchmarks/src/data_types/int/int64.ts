import { IDL, update } from 'azle';

let int64InitHeapStorage: { [key: string]: bigint | undefined } = {};

export class Int64Benchmarks {
    @update([IDL.Nat32])
    int64InitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: bigint = i % 2 === 0 ? 9_223_372_036_854_775_807n : 0n;
            i += 1;
        }
    }

    @update([IDL.Nat32])
    int64InitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            int64InitHeapStorage[`element${i}`] =
                i % 2 === 0 ? 9_223_372_036_854_775_807n : 0n;
            i += 1;
        }
    }
}
