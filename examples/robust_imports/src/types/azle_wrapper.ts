export * as wrappedAzle from 'azle';
import * as azle from 'azle';
import * as deep from './deep/deep';
export * from 'azle';
// export * from './confusion';

// export type text = number;

// TODO make a test for
// export * from 'azle';
// export * from './confusion';
// export type text = number;
// where azle and confusion export conflicting declarations
// where azle and confusion export conflicting declarations but the local export overrides it
// where azle and confusion doesn't export conflicting declarations and there is a local export that overrides something from both of them
// where azle and confusion and local don't conflict of override
// TODO explore not doing our processes if the ts compiler would fail
// TODO explore things that have multiple declarations

export { Record as WrappedRecord } from 'azle';

export { DeepRecord as WrappedDeepRecord } from './deep/deep';

export type WrappedNat = azle.nat;
export type WrappedInt8 = deep.DeepInt8;
export type WrappedBool = boolean;
export type WrappedVoid = void;
export type WrappedNull = null;

export type NotAzleType = [];
export default NotAzleType;
export type Record = number;
export type Tuple = NotAzleClass;
class NotAzleClass {}
