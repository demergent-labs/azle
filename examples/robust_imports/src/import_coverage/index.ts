import icQuery, * as ic from './types';
import { text, text as mT, text as mDT, text as mCT } from './types';
import dollarSignQuery from './types';
import query, { int8, int8 as variInt } from './types';
import { CoveredOpt, CoveredVec, coveredInt16 } from './types';

export const MyCoveredRecord = ic.CoveredRecord({
    count: ic.fathomlessStar.DeepInt8,
    name: ic.text,
    type_name: ic.azle.text,
    greeting: ic.FathomlessOpt(ic.text)
});
export const MyRecord = ic.Record({
    int1: ic.cavernousDefault,
    int2: ic.profoundDefault,
    int3: ic.bottomlessDefault,
    int4: ic.DeepInt8,
    int5: ic.FathomlessInt8,
    int6: ic.profoundStar.DeepInt8,
    int7: ic.FathomlessInt,
    int8: ic.ProfoundInt,
    int9: ic.fathomlessStar.default
});
export const MyFathomlessRecord = ic.FathomlessRecord({
    mytext: text
});
export const MyTuple = ic.CoveredTuple(mT);
export const MyDeepTuple = ic.DeepTuple(mDT);
export const MyCavernousTuple = ic.CavernousTuple(mCT);

export const MyCavernousRecord = ic.CavernousRecord({
    coveredRecord: MyCoveredRecord,
    myRecord: MyRecord,
    fathomlessRecord: MyFathomlessRecord,
    myTuple: MyTuple,
    myDeepTuple: MyDeepTuple,
    myCavernousTuple: MyCavernousTuple
});

export const MyVariant = ic.CoveredVariant({
    Thing: variInt,
    String: ic.text
});
export const MyDeepVariant = ic.DeepVariant({
    Thing: int8
});
export const MyFathomlessVariant = ic.FathomlessVariant({
    MyInt8: ic.int8,
    MyInt16: ic.int16
});
export const MyCavernousVariant = ic.CavernousVariant({
    eight: ic.Null,
    sixteen: ic.Null
});

const SomeCanister = ic.fathomlessCanister({
    query1: ic.query([], ic.bool),
    update1: ic.azle.update([], ic.text)
});

export const myVariantToMyDeepVariant = query(
    [MyVariant],
    MyDeepVariant,
    (mV) => {
        if (mV.Thing !== undefined) {
            const thing = mV.Thing;
            let result: typeof MyDeepVariant = { Thing: thing };
            return result;
        }

        throw 'Cannot convert to MyDeepVariant';
    }
);

export const myFathomlessVariantToMyCavernousVariant = query(
    [MyFathomlessVariant],
    MyCavernousVariant,
    (mV) => {
        if ('MyInt8' in mV) {
            return { eight: null };
        }

        return { sixteen: null };
    }
);

export const returnVec = ic.query([], ic.Vec(ic.azle.blob), () => {
    return [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6, 7])];
});

export const returnFathomlessVec = icQuery(
    [],
    ic.FathomlessVec(ic.azle.int16),
    () => {
        return [1, 2, 3, 4, 5, 6, 7];
    }
);

export const returnWeird = ic.azle.query([], ic.nat8, () => {
    return -10_000n;
});

export const returnFathomlessCanister = ic.azle.query(
    [SomeCanister],
    SomeCanister,
    (canister) => {
        return canister;
    }
);

export const makeCavernousRecord = dollarSignQuery(
    [],
    MyCavernousRecord,
    () => {
        return {
            coveredRecord: {
                count: 10,
                name: 'Bob',
                type_name: 'Imported Record',
                greeting: ic.Some('Hello there')
            },
            myRecord: {
                int1: 20,
                int2: 30,
                int3: 40,
                int4: 50,
                int5: 60,
                int6: 70,
                int7: 80,
                int8: 90,
                int9: 100
            },
            fathomlessRecord: {
                mytext: 'my text in a fathomless record'
            },
            myTuple: ['my tuple'],
            myDeepTuple: ['my deep tuple'],
            myCavernousTuple: ['my cavernous tuple']
        };
    }
);

export const typeCheck = dollarSignQuery(
    [CoveredVec(CoveredOpt(ic.nat16))],
    coveredInt16,
    (vec) => {
        if (vec.length === 1) {
            if ('None' in vec[0]) {
                return -1;
            }

            return vec[0].Some;
        }
        return -2;
    }
);
