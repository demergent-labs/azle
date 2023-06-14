// Named Imports
import { $query, int } from 'azle';
import { Record as Sweet, Variant, Tuple as AzleTuple } from 'azle';
import { Oneway as Cool, Query as Boy, Update as Town } from 'azle';
import WayCool, { Apple as Fuji } from './fruit';
import { default as Nice } from './fruit';
import type { Vec } from 'azle';
// import { thing as NotAzleThingEither } from './fruit';
import { Apple as GrannySmith } from './fruit';
// import { Banana } from './fruit';
// import { Apple as RedHandFruit, Banana as YellowHandFruit } from './fruit';
// import { Record } from './deep_test';
import { int as coolInt, nat as coolNat } from 'azle';
import NotAzleType from './azle_wrapper';
import NotAzle, { NotAzleType as NotAzleEither, Tuple } from './azle_wrapper';

import $icQuery, * as ic from './import_coverage';
import * as starFruit from './fruit';
import * as wrapper from './azle_wrapper';

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
}>;
export type MyCavernousRecord = ic.CavernousRecord<{}>;
export type MyVariant = ic.CoveredVariant<{}>;
export type MyDeepVariant = ic.DeepVariant<{}>;
export type MyTuple = ic.CoveredTuple<[]>;
export type MyDeepTuple = ic.DeepTuple<[]>;
export type MyCavernousTuple = ic.CavernousTuple<[]>;
export type MyFathomlessVariant = ic.FathomlessVariant<{}>;
export type MyCavernousVariant = ic.CavernousVariant<{}>;
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

import { Service } from 'azle';

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

type coolString = string;

// export type coolNat = StarImport.AlmostCoolNat;
// export type coolInt = int;

// Not Named Imports
import * as azle from 'azle';
import Coolboy from './fruit';
import './fruit';
export { $update } from 'azle';
// import('./test').then((myModule) => {});
// import { "thing" as Something } from './test';

// TODO how do we tell the difference between
// type User1<T extends object> = azle.Record<T>;
// // and
// type User2 = azle.Record<{}>;
// // and
// type CoolThing = azle.int;

type User = starFruit.Raspberry<{
    id: string;
    name: azle.text;
    age: coolNat;
    something: starFruit.nectarine64;
    something_else: coolInt;
}>;

// type Reaction = GrannySmith<{
//     Good: null;
//     Bad: null;
// }>;

// WayCool;
azle.$update;
export function simpleQuery(): azle.text {
    return 'This is a query function';
}

starFruit.default;
export function thing(): azle.int {
    return 0n;
}

// StarImport.default;
WayCool;
export function record(): User {
    return {
        id: 'Hello',
        age: 18n,
        something: 1n,
        something_else: -2n,
        name: 'Bob'
    };
}

// TODO tomororw. What about alias to built in types?
