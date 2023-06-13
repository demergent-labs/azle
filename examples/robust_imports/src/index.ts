// Named Imports
import { $query, int } from 'azle';
import { Record as Sweet, Variant, Tuple } from 'azle';
import { Oneway as Cool, Query as Boy, Update as Town } from 'azle';
import WayCool, { thing as NotAzleThing, Apple as Fuji } from './test';
import { default as Nice } from './test';
import type { Vec } from 'azle';
import { thing as NotAzleThingEither } from './test';
import { Apple as GrannySmith } from './test';
import { Banana } from './test';
import { Apple as RedHandFruit, Banana as YellowHandFruit } from './test';
import { Record } from './deep_test';
import { int as coolInt, nat as coolNat } from 'azle';

type coolString = string;

// export type coolNat = StarImport.AlmostCoolNat;
// export type coolInt = int;

// Not Named Imports
import * as azle from 'azle';
import * as StarImport from './test';
import Coolboy from './test';
import './test';
export { $update } from 'azle';
// import('./test').then((myModule) => {});
// import { "thing" as Something } from './test';

// TODO how do we tell the difference between
type User1<T extends object> = azle.Record<T>;
// and
type User2 = azle.Record<{}>;
// and
type CoolThing = azle.int;

type User = StarImport.Banana<{
    id: string;
    name: azle.text;
    age: coolNat;
    something: StarImport.AlmostCoolNat;
    something_else: coolInt;
}>;

type Reaction = GrannySmith<{
    Good: null;
    Bad: null;
}>;

// WayCool;
azle.$update;
export function simpleQuery(): azle.text {
    return 'This is a query function';
}

StarImport.default;
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
