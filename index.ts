declare var globalThis: any;

export const ic: ic = globalThis.ic;

type ic = {
    caller: () => string;
    canisterBalance: () => nat64;
    id: () => string;
    print: (...args: any) => void;
    time: () => nat64;
    trap: (message: string) => never;
};

// TODO let's add heartbeat, init, pre_upgrade, post_upgrade

export type Query<T> = T;
export type Update<T> = T;
export type variant<T> = T;
export type principal = string;
export type Result<T, V> = {
    ok?: T;
    err?: V;
};

export type int = number;
export type int64 = number;
export type int32 = number;
export type int16 = number;
export type int8 = number;

export type nat = number;
export type nat64 = number;
export type nat32 = number;
export type nat16 = number;
export type nat8 = number;

export type float32 = number;
export type float64 = number;