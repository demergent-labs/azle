export type Query<T> = T;
export type Update<T> = T;
export type Candid<T> = T;
export type Enum<T> = T;
export type Principal = string;
export type ICBlob = [];
export type Result<T, V> = {
    ok?: T;
    err?: V;
};
export type i64 = number;
export type i32 = number;
export type i16 = number;
export type i8 = number;
export type u64 = number;
export type u32 = number;
export type u16 = number;
export type u8 = number;
export type Nat = number;
export type Vec<T> = T[];
// declare var ic: any;
// export const ic = (globalThis as any).ic;

// import {
//     Query,
//     Update
// } from 'azle';
// declare var ic: any;

// export function echo(message: string): Query<string> {
//     return message;
// }

// export function set(key: string, value: string): Update<boolean> {
//     ic[key] = value;

//     return true;
// }

// export function get(key: string): Query<string> {
//     return ic[key];
// }