import { IDL, update } from 'azle';

let intInitHeapStorage: { [key: string]: bigint | undefined } = {};

export class IntBenchmarks {
    @update([IDL.Nat32])
    intInitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: bigint =
                i % 2 === 0
                    ? 170_141_183_460_469_231_731_687_303_715_884_105_727n
                    : 0n;
            i += 1;
        }
    }

    @update([IDL.Nat32])
    intInitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            intInitHeapStorage[`element${i}`] =
                i % 2 === 0
                    ? 170_141_183_460_469_231_731_687_303_715_884_105_727n
                    : 0n;
            i += 1;
        }
    }
}
