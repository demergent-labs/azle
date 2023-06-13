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

export type coolNat = StarImport.AlmostCoolNat;
export type coolInt = int;

// Not Named Imports
import * as azle from 'azle';
import * as StarImport from './test';
import Coolboy from './test';
import './test';
export { $update } from 'azle';
// import('./test').then((myModule) => {});
// import { "thing" as Something } from './test';

WayCool;
export function simpleQuery(): azle.text {
    return 'This is a query function';
}
