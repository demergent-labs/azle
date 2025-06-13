import { IDL, update } from 'azle';

let nat64InitHeapStorage: { [key: string]: bigint | undefined } = {};

export class Nat64Benchmarks {
    @update([IDL.Nat32])
    nat64InitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: bigint = i % 2 === 0 ? 18_446_744_073_709_551_615n : 0n;
            i += 1;
        }
    }

    @update([IDL.Nat32])
    nat64InitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            nat64InitHeapStorage[`element${i}`] =
                i % 2 === 0 ? 18_446_744_073_709_551_615n : 0n;
            i += 1;
        }
    }
}
