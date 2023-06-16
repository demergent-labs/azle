import $icQuery, * as ic from '../types/import_coverage';
import {
    text,
    text as mT,
    text as mDT,
    text as mCT
} from '../types/import_coverage';
import dollarSignQuery from '../types/import_coverage';
import query, { int8, int8 as variInt, match } from '../types/import_coverage';

export type MyCavernousRecord = ic.CavernousRecord<{
    coveredRecord: MyCoveredRecord;
    myRecord: MyRecord;
    fathomlessRecord: MyFathomlessRecord;
    myTuple: MyTuple;
    myDeepTuple: MyDeepTuple;
    myCavernousTuple: MyCavernousTuple;
}>;
export type MyCoveredRecord = ic.CoveredRecord<{
    count: ic.fathomlessStar.DeepInt8;
    name: ic.text;
    type: ic.azle.text;
    greeting: ic.FathomlessOpt<ic.text>;
}>;
export type MyRecord = ic.Record<{
    int1: ic.cavernousDefault;
    int2: ic.profoundDefault;
    int3: ic.bottomlessDefault;
    int4: ic.DeepInt8;
    int5: ic.FathomlessInt8;
    int6: ic.profoundStar.DeepInt8;
    int7: ic.FathomlessInt;
    int8: ic.ProfoundInt;
    int9: ic.fathomlessStar.default;
}>;
export type MyFathomlessRecord = ic.FathomlessRecord<{
    mytext: text;
}>;
export type MyTuple = ic.CoveredTuple<[mT]>;
export type MyDeepTuple = ic.DeepTuple<[mDT]>;
export type MyCavernousTuple = ic.CavernousTuple<[mCT]>;

export type MyVariant = ic.CoveredVariant<{
    Thing: variInt;
    String: ic.text;
}>;
export type MyDeepVariant = ic.DeepVariant<{
    Thing: int8;
}>;
export type MyFathomlessVariant = ic.FathomlessVariant<{
    MyInt8: ic.int8;
    MyInt16: ic.int16;
}>;
export type MyCavernousVariant = ic.CavernousVariant<{
    eight: null;
    sixteen: null;
}>;

class SomeService extends ic.fathomlessService {
    @ic.serviceQuery
    query1: () => ic.azle.CallResult<boolean>;

    @ic.azle.serviceUpdate
    update1: () => ic.CallResult<string>;
}

query;
export function myVariantToMyDeepVariant(mV: MyVariant): MyDeepVariant {
    return match(mV, {
        Thing: (thing) => {
            let result: MyDeepVariant = { Thing: thing };
            return result;
        },
        String: () => {
            throw 'Cannot convert to MyDeepVariant';
        }
    });
}

query;
export function myFathomlessVariantToMyCavernousVariant(
    mV: MyFathomlessVariant
): MyCavernousVariant {
    return match(mV, {
        MyInt8: () => {
            return { eight: null };
        },
        MyInt16: () => {
            return { sixteen: null };
        }
    });
}

ic.$query;
export function returnsVec(): ic.Vec<ic.azle.blob> {
    return [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6, 7])];
}

$icQuery;
export function returnsFathomlessVec(): ic.FathomlessVec<ic.azle.int16> {
    return [1, 2, 3, 4, 5, 6, 7];
}

ic.azle.$query;
export function returnWeird(): ic.nat8 {
    return -10000n;
}

ic.azle.$query;
export function returnFathomlessService(): SomeService {
    return new SomeService(
        ic.Principal.fromText(
            process.env.SOME_SERVICE_PRINCIPAL ??
                ic.azle.ic.trap(
                    'process.env.SOME_SERVICE_PRINCIPAL is undefined'
                )
        )
    );
}

dollarSignQuery;
export function makeCavernousRecord(): MyCavernousRecord {
    return {
        coveredRecord: {
            count: 10,
            name: 'Bob',
            type: 'Imported Record',
            greeting: ic.Opt.Some('Hello there')
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
