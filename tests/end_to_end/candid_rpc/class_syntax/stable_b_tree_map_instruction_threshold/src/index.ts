import { IDL, Principal, query, StableBTreeMap, update } from 'azle';
import { v4 } from 'uuid';

const SmallRecord = IDL.Record({
    id: IDL.Principal
});
type SmallRecord = {
    id: Principal;
};

let smallRecordMap = StableBTreeMap<string, SmallRecord>(0);

const MediumRecord = IDL.Record({
    id: IDL.Text,
    username: IDL.Text,
    age: IDL.Nat,
    internetIdentity: IDL.Principal
});
type MediumRecord = {
    id: string;
    username: string;
    age: bigint;
    internetIdentity: Principal;
};

let mediumRecordMap = StableBTreeMap<string, MediumRecord>(1);

const LargeRecord = IDL.Record({
    id: IDL.Text,
    username: IDL.Text,
    age: IDL.Nat,
    internetIdentity: IDL.Principal,
    signature: IDL.Vec(IDL.Nat8),
    friends: IDL.Vec(IDL.Text),
    mediumRecord: MediumRecord
});
type LargeRecord = {
    id: string;
    username: string;
    age: bigint;
    internetIdentity: Principal;
    signature: Uint8Array;
    friends: string[];
    mediumRecord: MediumRecord;
};

let largeRecordMap = StableBTreeMap<string, LargeRecord>(2);

export default class {
    @update([IDL.Nat32])
    insertSmallRecord(numToInsert: number): void {
        for (let i = 0; i < numToInsert; i++) {
            const id = v4();

            smallRecordMap.insert(id, {
                id: Principal.fromText('aaaaa-aa')
            });
        }
    }

    @query([IDL.Nat32], IDL.Vec(IDL.Text))
    keysSmallRecord(numToReturn: number): string[] {
        return smallRecordMap.keys(0, numToReturn);
    }

    @query([IDL.Nat32], IDL.Vec(SmallRecord))
    valuesSmallRecord(numToReturn: number): SmallRecord[] {
        return smallRecordMap.values(0, numToReturn);
    }

    @query([IDL.Nat32], IDL.Vec(IDL.Tuple(IDL.Text, SmallRecord)))
    itemsSmallRecord(numToReturn: number): [string, SmallRecord][] {
        return smallRecordMap.items(0, numToReturn);
    }

    @update([IDL.Nat32])
    insertMediumRecord(numToInsert: number): void {
        for (let i = 0; i < numToInsert; i++) {
            const id = v4();

            mediumRecordMap.insert(id, {
                id,
                username: `lastmjs${i}`,
                age: BigInt(i),
                internetIdentity: Principal.fromText('aaaaa-aa')
            });
        }
    }

    @query([IDL.Nat32], IDL.Vec(IDL.Text))
    keysMediumRecord(numToReturn: number): string[] {
        return mediumRecordMap.keys(0, numToReturn);
    }

    @query([IDL.Nat32], IDL.Vec(MediumRecord))
    valuesMediumRecord(numToReturn: number): MediumRecord[] {
        return mediumRecordMap.values(0, numToReturn);
    }

    @query([IDL.Nat32], IDL.Vec(IDL.Tuple(IDL.Text, MediumRecord)))
    itemsMediumRecord(numToReturn: number): [string, MediumRecord][] {
        return mediumRecordMap.items(0, numToReturn);
    }

    @update([IDL.Nat32])
    insertLargeRecord(numToInsert: number): void {
        for (let i = 0; i < numToInsert; i++) {
            const id = v4();

            largeRecordMap.insert(id, {
                id,
                username: `lastmjs${i}`,
                age: BigInt(i),
                internetIdentity: Principal.fromText('aaaaa-aa'),
                signature: Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
                friends: [v4(), v4(), v4(), v4()],
                mediumRecord: {
                    id,
                    username: `lastmjs${i}`,
                    age: BigInt(i),
                    internetIdentity: Principal.fromText('aaaaa-aa')
                }
            });
        }
    }

    @query([IDL.Nat32], IDL.Vec(IDL.Text))
    keysLargeRecord(numToReturn: number): string[] {
        return largeRecordMap.keys(0, numToReturn);
    }

    @query([IDL.Nat32], IDL.Vec(LargeRecord))
    valuesLargeRecord(numToReturn: number): LargeRecord[] {
        return largeRecordMap.values(0, numToReturn);
    }

    @query([IDL.Nat32], IDL.Vec(IDL.Tuple(IDL.Text, LargeRecord)))
    itemsLargeRecord(numToReturn: number): [string, LargeRecord][] {
        return largeRecordMap.items(0, numToReturn);
    }
}
