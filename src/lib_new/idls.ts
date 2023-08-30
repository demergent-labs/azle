import { IDL } from '@dfinity/candid';

export const IDLs: {
    [key: string]: IDL.Type;
} = {
    blob: IDL.Vec(IDL.Nat8),
    empty: IDL.Empty,
    float64: IDL.Float64,
    float32: IDL.Float32,
    int: IDL.Int,
    int64: IDL.Int64,
    int32: IDL.Int32,
    int16: IDL.Int16,
    int8: IDL.Int8,
    nat: IDL.Nat,
    nat64: IDL.Nat64,
    nat32: IDL.Nat32,
    nat16: IDL.Nat16,
    nat8: IDL.Nat8,
    Principal: IDL.Principal,
    reserved: IDL.Reserved,
    text: IDL.Text
};
