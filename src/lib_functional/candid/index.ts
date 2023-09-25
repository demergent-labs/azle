export * from './reference';
import { IDL } from '@dfinity/candid';
import {
    AzleBlob,
    blob,
    AzleVec,
    AzleOpt,
    AzleInt,
    AzleInt64,
    AzleInt32,
    AzleInt16,
    AzleInt8,
    AzleNat,
    AzleNat64,
    AzleNat32,
    AzleNat16,
    AzleNat8,
    AzleFloat64,
    AzleFloat32,
    nat,
    nat64,
    nat32,
    nat16,
    nat8,
    int,
    int64,
    int32,
    int16,
    int8,
    float64,
    float32,
    Principal,
    AzleNull,
    Null,
    AzleReserved,
    reserved,
    AzleEmpty,
    empty,
    AzleBool,
    bool,
    AzlePrincipal,
    AzleResult,
    Result,
    AzleTuple,
    Tuple
} from '../../lib_new';

export type TypeMapping<T> = T extends IDL.TextClass
    ? string
    : T extends AzleBool
    ? bool
    : T extends AzleInt
    ? int
    : T extends AzleInt64
    ? int64
    : T extends AzleInt32
    ? int32
    : T extends AzleInt16
    ? int16
    : T extends AzleInt8
    ? int8
    : T extends AzleNat
    ? nat
    : T extends AzleNat64
    ? nat64
    : T extends AzleNat32
    ? nat32
    : T extends AzleNat16
    ? nat16
    : T extends AzleNat8
    ? nat8
    : T extends AzleFloat64
    ? float64
    : T extends AzleFloat32
    ? float32
    : T extends never[]
    ? void
    : T extends AzleTuple
    ? any
    : // : T extends AzleTuple<[infer U]>
    // ? [TypeMapping<U>]
    // : T extends AzleTuple<[infer U, infer W]>
    // ? [TypeMapping<U>, TypeMapping<W>]
    T extends AzleVec<infer U>
    ? TypeMapping<U>[]
    : T extends AzleOpt<infer U>
    ? [TypeMapping<U>] | []
    : T extends AzleResult<infer U, infer W>
    ? Result<U, W>
    : T extends AzleBlob
    ? blob
    : T extends AzlePrincipal
    ? Principal
    : T extends AzleNull
    ? Null
    : T extends AzleReserved
    ? reserved
    : T extends AzleEmpty
    ? empty
    : T;
