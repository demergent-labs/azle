import {
    blob,
    Canister,
    nat,
    nat32,
    Principal,
    query,
    Record,
    StableBTreeMap,
    stableJson,
    text,
    update,
    Vec,
    Void
} from 'azle';
import { v4 } from 'uuid';

const SmallRecord = Record({
    id: Principal
});
type SmallRecord = typeof SmallRecord.tsType;

let smallRecordMap = StableBTreeMap<string, SmallRecord>(
    stableJson,
    stableJson,
    0
);

const MediumRecord = Record({
    id: text,
    username: text,
    age: nat,
    internetIdentity: Principal
});
type MediumRecord = typeof MediumRecord.tsType;

let mediumRecordMap = StableBTreeMap<string, MediumRecord>(
    stableJson,
    stableJson,
    1
);

const LargeRecord = Record({
    id: text,
    username: text,
    age: nat,
    internetIdentity: Principal,
    signature: blob,
    friends: Vec(text),
    mediumRecord: MediumRecord
});
type LargeRecord = typeof LargeRecord.tsType;

let largeRecordMap = StableBTreeMap<string, LargeRecord>(
    stableJson,
    stableJson,
    2
);

export default Canister({
    insertSmallRecord: update([nat32], Void, (numToInsert) => {
        for (let i = 0; i < numToInsert; i++) {
            const id = v4();

            smallRecordMap.insert(id, {
                id: Principal.fromText('aaaaa-aa')
            });
        }
    }),
    valuesSmallRecord: query([nat32], Vec(SmallRecord), (numToReturn) => {
        return smallRecordMap.values(0, numToReturn);
    }),
    insertMediumRecord: update([nat32], Void, (numToInsert) => {
        for (let i = 0; i < numToInsert; i++) {
            const id = v4();

            mediumRecordMap.insert(id, {
                id,
                username: `lastmjs${i}`,
                age: BigInt(i),
                internetIdentity: Principal.fromText('aaaaa-aa')
            });
        }
    }),
    valuesMediumRecord: query([nat32], Vec(MediumRecord), (numToReturn) => {
        return mediumRecordMap.values(0, numToReturn);
    }),
    insertLargeRecord: update([nat32], Void, (numToInsert) => {
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
    }),
    valuesLargeRecord: query([nat32], Vec(LargeRecord), (numToReturn) => {
        return largeRecordMap.values(0, numToReturn);
    })
});
