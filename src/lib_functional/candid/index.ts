export * from './reference';
import { IDL } from '@dfinity/candid';
import {
    AzleBlob,
    blob,
    AzleVec,
    AzleOpt,
    AzleInt8,
    int8,
    AzleNat64,
    AzleNat32
} from '../../lib_new';

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
    : T extends AzleNat32
    ? number
    : T extends AzleBlob
    ? blob
    : T extends AzleInt8
    ? int8
    : T;
