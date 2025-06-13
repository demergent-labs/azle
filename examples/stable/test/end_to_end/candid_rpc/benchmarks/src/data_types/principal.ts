import { IDL, Principal, update } from 'azle';

let principalInitHeapStorage: { [key: string]: Principal | undefined } = {};

export class PrincipalBenchmarks {
    @update([IDL.Nat32])
    principalInitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: Principal =
                i % 2 === 0
                    ? Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                    : Principal.fromText('aaaaa-aa');
            i += 1;
        }
    }

    @update([IDL.Nat32])
    principalInitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            principalInitHeapStorage[`element${i}`] =
                i % 2 === 0
                    ? Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                    : Principal.fromText('aaaaa-aa');
            i += 1;
        }
    }
}
