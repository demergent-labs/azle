export * from './reference';
import { IDL } from '@dfinity/candid';
import { AzleVec, AzleOpt, AzleNat64 } from '../../lib_new';

export type TypeMapping<T> = T extends IDL.TextClass
    ? string
    : T extends IDL.BoolClass
    ? boolean
    : T extends AzleNat64
    ? bigint
    : T extends never[]
    ? void
    : T extends AzleVec<infer U>
    ? TypeMapping<U>[]
    : T extends AzleOpt<infer U>
    ? [TypeMapping<U>] | []
    : never;
