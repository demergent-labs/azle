declare var globalThis: any;

export const ic: ic = globalThis.ic;

// TODO perhaps this should just be provided through calling
// TODO the management canister
ic.rawRand = function() {
    return {
        name: 'rawRand'
    } as any;
};

// ic.call = function* (...args) {
//     return yield {
//         name: 'call',
//         args: [
//             arguments.callee.name,
//             ...args
//         ]
//     } as any;
// };

type ic = {
    // call: (
    //     canisterId: Principal,
    //     methodName: string,
    //     ...args: any[]
    // ) => Generator; // TODO improve type inference here, try to get rid of the type parameters
    caller: () => string;
    canisters: {
        [canisterName: string]: <T>(canisterId: Principal) => T;
    };
    canisterBalance: () => float64; // TODO should be a nat64
    id: () => string;
    print: (...args: any) => void;
    rawRand: () => nat8[]; // TODO I think we want this to really be a JS Uint8Array
    time: () => float64; // TODO should be a nat64
    trap: (message: string) => never;
};

// TODO let's add heartbeat, init, pre_upgrade, post_upgrade

export type Query<T> = T;
// export type QueryAsync<T> = Generator<T>; // TODO enable once this is resolved: https://forum.dfinity.org/t/inter-canister-query-calls-community-consideration/6754
export type Update<T> = T;
// TODO we should change the type of UpdateAsync to force the dev to yield if possible
export type UpdateAsync<T> = Generator<any, T, any>; // TODO to be stricter we may want the last parameter to be unknown: https://github.com/demergent-labs/azle/issues/138
// TODO the generator types are not exactly correct...but at least I've given the user the Async type
export type Async<T> = Generator<any, T, any>; // TODO to be stricter we may want the last parameter to be unknown: https://github.com/demergent-labs/azle/issues/138
export type Canister<T> = T;
export type Variant<T> = T;
export type Principal = string;
export type Opt<T> = T | null;
export type Result<T, V> = {
    ok?: T;
    err?: V;
};

// TODO warn against incorrect number representations!!!

// TODO for int and int64 I think bigint will work
export type int = number; // TODO should be bigint
export type int64 = number; // TODO should be bigint
export type int32 = number;
export type int16 = number;
export type int8 = number;

// TODO for nat and nat64 I think bigint will work
export type nat = number; // TODO should be bigint
export type nat64 = number; // TODO should be bigint
export type nat32 = number;
export type nat16 = number;
export type nat8 = number;

export type float32 = number;
export type float64 = number;