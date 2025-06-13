import { IDL, update } from 'azle';

let natInitHeapStorage: { [key: string]: bigint | undefined } = {};

export class NatBenchmarks {
    @update([IDL.Nat32])
    natInitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: bigint =
                i % 2 === 0
                    ? 340_282_366_920_938_463_463_374_607_431_768_211_455n
                    : 0n;
            i += 1;
        }
    }

    @update([IDL.Nat32])
    natInitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            natInitHeapStorage[`element${i}`] =
                i % 2 === 0
                    ? 340_282_366_920_938_463_463_374_607_431_768_211_455n
                    : 0n;
            i += 1;
        }
    }
}
