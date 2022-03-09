declare var globalThis: any;

export const ic: ic = globalThis.ic;

type ic = {
    caller: () => string;
    canisterBalance: () => u64;
    id: () => string;
    print: (...args: any) => void;
    time: () => u64;
    trap: (message: string) => never;
};

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