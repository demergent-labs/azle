import * as types from './types';
import * as azle from 'azle';

function offDuty(): types.DeepGuardResultAlias {
    return { Ok: null };
}

const HELLO_WORLD = 'Hello, World!';

type LocalIntAlias = types.Float64Alias;

type NumberAliases = azle.Record<{
    first: types.AzleIntAlias;
    second: types.IntAlias;
    third: types.Float64Alias;
    fourth: types.MixedIntAlias;
    fifth: types.StirredIntAlias;
    sixth: types.DeepFloat32Alias;
    seventh: types.DeepFloat64Alias;
    eighth: types.DeepIntAlias;
    ninth: types.DeepInt8Alias;
    tenth: types.DeepNatAlias;
    eleventh: types.DeepNat8Alias;
    twelfth: LocalIntAlias;
}>;

// TODO can we have aliases like this? I mean imagine using azle.Result. We want
// that, but will it work?
// type MyMixedRecord = types.MixedRecordAlias<{
//     name: azle.text;
//     age: types.MixedUserDefinedAlias;
// }>;
// type MyStirredRecord = types.StirredRecordAlias<{
//     name: azle.text;
//     age: types.StirredUserDefinedAlias;
//     height: types.UserDefinedAlias;
// }>;

import {
    MixedUserDefinedAlias,
    UserDefinedAlias,
    StirredUserDefinedAlias
} from './types';

type MyMixedRecord = types.MixedRecordAlias<{
    name: azle.text;
    age: MixedUserDefinedAlias;
}>;
type MyStirredRecord = types.StirredRecordAlias<{
    name: azle.text;
    age: StirredUserDefinedAlias;
    height: UserDefinedAlias;
}>;

azle.$query;
export function addHeight(
    mixed: MyMixedRecord,
    height: azle.float64
): MyStirredRecord {
    return {
        name: mixed.name,
        age: { num: mixed.age.num },
        height: { num: height }
    };
}

// TODO get this more robust test working
// import { MixedStarRecord, MixedConcreteStar } from './types';
// import {
//     MixedStarRecord as ImportedRecord,
//     MixedConcreteStar as ImportedConcrete
// } from './types';
// type FakeConcreteStar = MixedConcreteStar;
// type FakeMixedStarRecord = MixedStarRecord;
// azle.$query;
// export function compareStars(
//     record: MixedStarRecord,
//     concrete: MixedConcreteStar,
//     fakeRecord: FakeMixedStarRecord,
//     fakeConcrete: FakeConcreteStar,
//     typeRecord: types.MixedStarRecord,
//     typeConcrete: types.MixedConcreteStar,
//     importedRecord: ImportedRecord,
//     importedConcrete: ImportedConcrete
// ): azle.Result<boolean, string> {
//     return azle.Result.Ok(
//         record.star === concrete.star &&
//             fakeRecord.star === fakeConcrete.star &&
//             typeRecord.star === typeConcrete.star &&
//             importedRecord.star === importedConcrete.star &&
//             record.star === fakeRecord.star &&
//             record.star === typeRecord.star &&
//             record.star === importedRecord.star
//     );
// }

import { MixedConcreteStar } from './types';
import { Result } from 'azle'; // TODO replace this below with azle.Result and make sure that works
azle.$query;
export function compareStars(
    record: MixedConcreteStar,
    concrete: MixedConcreteStar
): Result<boolean, string> {
    return azle.Result.Ok(record.star === concrete.star);
}

azle.$query;
export function helloTextAlias(): types.TextAlias {
    return HELLO_WORLD;
}

azle.$query;
export function helloAzleTextAlias(): types.AzleTextAlias {
    return HELLO_WORLD;
}

azle.$query;
export function helloMixedTextAlias(): types.MixedTextAlias {
    return HELLO_WORLD;
}

azle.$query;
export function helloDeepTextAlias(): types.DeepTextAlias {
    return HELLO_WORLD;
}

azle.$query;
export function helloStirredTextAlias(): types.StirredTextAlias {
    return HELLO_WORLD;
}

azle.$query;
export function getDeepBlob(blob: types.DeepBlobAlias): types.DeepBlobAlias {
    return blob;
}

azle.$query;
export function deepEmptyAlias(): types.DeepEmptyAlias {
    throw 'empty';
}

azle.$query({ guard: offDuty });
export function getNumberAliases(): NumberAliases {
    return {
        first: 1n,
        second: 2n,
        third: 3,
        fourth: 4n,
        fifth: 5n,
        sixth: 6,
        seventh: 7,
        eighth: 8n,
        ninth: 9,
        tenth: 10n,
        eleventh: 11,
        twelfth: 12
    };
}

azle.$query;
export function passPrincipal(
    principal: types.DeepPrincipalAlias
): types.DeepPrincipalAlias {
    return principal;
}

azle.$query;
export function getReservedAlias(): types.DeepReservedAlias {
    return 'anything';
}

types.Deep$queryAlias;
export function simpleDeepQuery(): types.VoidAlias {
    console.log(HELLO_WORLD);
}

types.Azle$queryAlias;
export function simpleAzleQuery(): types.VoidAlias {
    console.log(HELLO_WORLD);
}

types.$queryAlias;
export function simpleQuery(): types.VoidAlias {
    console.log(HELLO_WORLD);
}

class AliasedService extends types.DeepServiceAlias {
    @types.DeepServiceQueryAlias
    testQuery: () => azle.CallResult<string>;
}

export type AliasedServiceAlias = AliasedService;

azle.$query;
export function checkServiceAlias(service: AliasedService): AliasedService {
    return service;
}

export type MyLocalNumberAlias = number;
export type MyDeepRecordFromAlias = types.DeepRecordAlias<{ depth: azle.nat8 }>;
export type MyDeepVariantFromAlias = types.DeepVariantAlias<{
    good: null;
    bad: null;
    ugly: null;
}>;
export type MyRecordFromAlias = types.RecordAlias<{
    id: azle.nat;
    name: types.DeepOptAlias<string>;
    depth: MyDeepRecordFromAlias;
    tups: types.DeepTupleAlias<[string, types.Float64Alias]>;
    description: MyDeepVariantFromAlias;
    list: types.DeepVecAlias<azle.nat16>;
}>;
export type MyRecordFromAliasAlias = MyRecordFromAlias;
export type SuperAlias = MyRecordFromAliasAlias;

azle.$query;
export function getMyRecord(): MyRecordFromAlias {
    return {
        id: 7n,
        name: azle.Opt.Some('Bob'),
        depth: { depth: 3 },
        tups: ['Hello', 1.23],
        description: { ugly: null },
        list: [1, 2, 3, 4, 5, 6, 7]
    };
}

azle.$query;
export function getMyRecordAlias(): MyRecordFromAliasAlias {
    return {
        id: 8n,
        name: azle.Opt.Some('Alice'),
        depth: { depth: 3 },
        tups: ['Hello', 1.23],
        description: { ugly: null },
        list: [1, 2, 3, 4, 5, 6, 7]
    };
}

azle.$query;
export function getSuperAlias(): SuperAlias {
    return {
        id: 9n,
        name: azle.Opt.Some('Eve'),
        depth: { depth: 3 },
        tups: ['Hello', 1.23],
        description: { ugly: null },
        list: [1, 2, 3, 4, 5, 6, 7]
    };
}

azle.$query;
export function getManualAlias(): types.DeepManualAlias<number> {
    azle.ic.reply(9.87);
}

type MyFuncFromAlias = types.DeepFuncAlias<
    types.DeepQueryAlias<(param1: azle.text) => azle.text>
>;

azle.$query;
export function returnFuncAlias(func: MyFuncFromAlias): MyFuncFromAlias {
    return func;
}

let stableMap = new types.DeepStableBTreeMapAlias<azle.nat16, azle.text>(
    1,
    10,
    1_000
);

azle.$update;
export function setStable(
    key: azle.nat16,
    value: azle.text
): types.DeepOptAlias<azle.text> {
    return stableMap.insert(key, value);
}

azle.$query;
export function getStable(key: azle.nat16): types.DeepOptAlias<azle.text> {
    return stableMap.get(key);
}
