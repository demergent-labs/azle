export * as wrappedAzle from 'azle';
import * as azle from 'azle';
import * as deep from './deep/deep';

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
