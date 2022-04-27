import {
    Query,
    int,
    int64,
    int32,
    int16,
    int8,
    nat,
    nat64,
    nat32,
    nat16,
    nat8,
    float64,
    float32,
    Principal,
    ic
} from 'azle';

export function getInt(): Query<int> {
    return 170141183460469231731687303715884105727n;
}

export function printInt(int: int): Query<int> {
    ic.print(typeof int);
    return int;
}

export function getInt64(): Query<int64> {
    return 9223372036854775807n;
}

export function printInt64(int64: int64): Query<int64> {
    ic.print(typeof int64);
    return int64;
}

export function getInt32(): Query<int32> {
    return 2147483647;
}

export function printInt32(int32: int32): Query<int32> {
    ic.print(typeof int32);
    return int32;
}

export function getInt16(): Query<int16> {
    return 32767;
}

export function printInt16(int16: int16): Query<int16> {
    ic.print(typeof int16);
    return int16;
}

export function getInt8(): Query<int8> {
    return 127;
}

export function printInt8(int8: int8): Query<int8> {
    ic.print(typeof int8);
    return int8;
}

export function getNat(): Query<nat> {
    return 340282366920938463463374607431768211455n;
}

export function printNat(nat: nat): Query<nat> {
    ic.print(typeof nat);
    return nat;
}

export function getNat64(): Query<nat64> {
    return 18446744073709551615n;
}

export function printNat64(nat64: nat64): Query<nat64> {
    ic.print(typeof nat64);
    return nat64;
}

export function getNat32(): Query<nat32> {
    return 4294967295;
}

export function printNat32(nat32: nat32): Query<nat32> {
    ic.print(typeof nat32);
    return nat32;
}

export function getNat16(): Query<nat16> {
    return 65535;
}

export function printNat16(nat16: nat16): Query<nat16> {
    ic.print(typeof nat16);
    return nat16;
}

export function getNat8(): Query<nat8> {
    return 255;
}

export function printNat8(nat8: nat8): Query<nat8> {
    ic.print(typeof nat8);
    return nat8;
}

export function getFloat64(): Query<float64> {
    return Math.E;
}

export function printFloat64(float64: float64): Query<float64> {
    ic.print(typeof float64);
    return float64;
}

export function getFloat32(): Query<float32> {
    return Math.PI;
}

export function printFloat32(float32: float32): Query<float32> {
    ic.print(typeof float32);
    return float32;
}

// TODO make sure that the principal tests break when we upgrade to @dfinity/principal
export function getPrincipal(): Query<Principal> {
    return 'rrkah-fqaaa-aaaaa-aaaaq-cai';
}

export function printPrincipal(principal: Principal): Query<Principal> {
    ic.print(typeof principal);
    return principal;
}