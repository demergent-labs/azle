import { IDL, Principal, update } from 'azle';

const User = IDL.Record({
    principal: IDL.Principal,
    age: IDL.Nat32,
    deceased: IDL.Bool,
    dna: IDL.Vec(IDL.Nat8),
    height: IDL.Float32,
    username: IDL.Text
});
type User = {
    principal: Principal;
    age: number;
    deceased: boolean;
    dna: Uint8Array;
    height: number;
    username: string;
};

let recordInitHeapStorage: { [key: string]: User | undefined } = {};

export class RecordBenchmarks {
    @update([IDL.Nat32])
    recordInitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: User =
                i % 2 === 0
                    ? {
                          principal: Principal.fromText(
                              'ryjl3-tyaaa-aaaaa-aaaba-cai'
                          ),
                          age: 43,
                          deceased: false,
                          dna: Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
                          height: 6.25,
                          username: 'djohn'
                      }
                    : {
                          principal: Principal.fromText('aaaaa-aa'),
                          age: 123,
                          deceased: true,
                          dna: Uint8Array.from([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]),
                          height: 5.45,
                          username: 'gramps'
                      };
            i += 1;
        }
    }

    @update([IDL.Nat32])
    recordInitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            recordInitHeapStorage[`element${i}`] =
                i % 2 === 0
                    ? {
                          principal: Principal.fromText(
                              'ryjl3-tyaaa-aaaaa-aaaba-cai'
                          ),
                          age: 43,
                          deceased: false,
                          dna: Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
                          height: 6.25,
                          username: 'djohn'
                      }
                    : {
                          principal: Principal.fromText('aaaaa-aa'),
                          age: 123,
                          deceased: true,
                          dna: Uint8Array.from([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]),
                          height: 5.45,
                          username: 'gramps'
                      };
            i += 1;
        }
    }
}
