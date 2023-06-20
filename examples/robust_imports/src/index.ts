// Named Imports
export * from './import_coverage/import_coverage';
export * from './azle_coverage/azle_coverage';
import { $query, int } from 'azle';
import { Record as Sweet, Variant, Tuple as AzleTuple } from 'azle';
import { Oneway as Cool, Query as Boy, Update as Town } from 'azle';
import WayCool, { Apple as Fuji } from './azle_coverage/fruit';
import { default as Nice } from './azle_coverage/fruit';
import type { Vec } from 'azle';
// import { thing as NotAzleThingEither } from './fruit';
import { Apple as GrannySmith } from './azle_coverage/fruit';
// import { Banana } from './fruit';
// import { Apple as RedHandFruit, Banana as YellowHandFruit } from './fruit';
// import { Record } from './deep_test';
import { int as coolInt, nat as coolNat } from 'azle';
import NotAzleType from './types/azle_wrapper';
import NotAzle, {
    NotAzleType as NotAzleEither,
    Tuple
} from './types/azle_wrapper';

import * as starFruit from './azle_coverage/fruit';
import * as wrapper from './types/azle_wrapper';

type coolString = string;

// export type coolNat = StarImport.AlmostCoolNat;
// export type coolInt = int;

// Not Named Imports
import * as azle from 'azle';
import Coolboy from './azle_coverage/fruit';
import './azle_coverage/fruit';
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
