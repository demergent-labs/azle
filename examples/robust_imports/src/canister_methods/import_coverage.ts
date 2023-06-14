import $icQuery, * as ic from '../types/import_coverage';

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
export type MyCavernousRecord = ic.CavernousRecord<{
    int1: ic.cavernousDefault;
}>;
export type MyVariant = ic.CoveredVariant<{
    thing: null;
}>;
export type MyDeepVariant = ic.DeepVariant<{
    thing: null;
}>;
export type MyTuple = ic.CoveredTuple<[string]>;
export type MyDeepTuple = ic.DeepTuple<[string]>;
export type MyCavernousTuple = ic.CavernousTuple<[string]>;
export type MyFathomlessVariant = ic.FathomlessVariant<{
    thing: null;
}>;
export type MyCavernousVariant = ic.CavernousVariant<{
    thing: null;
}>;
export type MyFathomlessRecord = ic.FathomlessRecord<{}>;

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

class SomeService extends ic.fathomlessService {
    @ic.serviceQuery
    query1: () => ic.azle.CallResult<boolean>;

    @ic.azle.serviceUpdate
    update1: () => ic.CallResult<string>;
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
