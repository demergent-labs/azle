import { IDL } from '@dfinity/candid';

export const bool = IDL.Bool;
export type bool = boolean;
export const blob = IDL.Vec(IDL.Nat8);
export type blob = Uint8Array;
export const empty = IDL.Empty;
export type empty = never;
export const int = IDL.Int;
export type int = bigint;
export const int8 = IDL.Int8;
export type int16 = number;
export const int16 = IDL.Int16;
export type int8 = number;
export const int32 = IDL.Int32;
export type int32 = number;
export const int64 = IDL.Int64;
export type int64 = bigint;
export const nat = IDL.Nat;
export type nat = bigint;
export const nat8 = IDL.Nat8;
export type nat8 = number;
export const nat16 = IDL.Nat16;
export type nat16 = number;
export const nat32 = IDL.Nat32;
export type nat32 = number;
export const nat64 = IDL.Nat64;
export type nat64 = bigint;
export const Null = IDL.Null;
export const reserved = IDL.Reserved;
export type reserved = any;
export const text = IDL.Text;
export type text = string;
export const float32 = IDL.Float32;
export type float32 = number;
export const float64 = IDL.Float64;
export type float64 = number;
export const principal = IDL.Principal;
export { Principal } from '@dfinity/principal';
export const Vec = IDL.Vec;
export type Vec<T> = T[];
export type Opt<Value> = Value[];
export const Opt = IDL.Opt;
export const Void = [];

export function Some<T>(value: T): T[] {
    return [value];
}
export const None: [] = [];
