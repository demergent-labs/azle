declare var globalThis: any;

export const ic: ic = globalThis.ic;

ic.rawRand = function* () {
    yield {
        name: 'rawRand'
    } as any;
};

type ic = {
    caller: () => string;
    canisterBalance: () => float64; // TODO should be a nat64
    id: () => string;
    print: (...args: any) => void;
    rawRand: () => Generator<float64[]>; // TODO should be a nat8[]
    time: () => float64; // TODO should be a nat64
    trap: (message: string) => never;
};

// TODO let's add heartbeat, init, pre_upgrade, post_upgrade

export type Query<T> = T;
export type QueryAsync<T> = Generator<T>;
export type Update<T> = T;
export type UpdateAsync<T> = Generator<T>;
export type Variant<T> = T;
export type Principal = string;
export type Opt<T> = T | null;
export type Result<T, V> = {
    ok?: T;
    err?: V;
};

// export type int = number;
// export type int64 = number;
// export type int32 = number;
// export type int16 = number;
// export type int8 = number;

// export type nat = number;
// export type nat64 = number;
// export type nat32 = number;
// export type nat16 = number;
// export type nat8 = number;

export type float32 = number;
export type float64 = number;