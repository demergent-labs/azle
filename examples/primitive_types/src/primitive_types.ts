// TODO we need to see the principal type used
// TODO we should also have parameters, we are only testing return types here

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

export function getInt32(): Query<int32> {
    return 2147483647;
}

export function getInt16(): Query<int16> {
    return 32767;
}

export function getInt8(): Query<int8> {
    return 127;
}

export function getNat(): Query<nat> {
    return 340282366920938463463374607431768211455n;
}

export function getNat64(): Query<nat64> {
    return 18446744073709551615n;
}

export function getNat32(): Query<nat32> {
    return 4294967295;
}

export function getNat16(): Query<nat16> {
    return 65535;
}

export function getNat8(): Query<nat8> {
    return 255;
}

export function getFloat64(): Query<float64> {
    return Math.E;
}

export function getFloat32(): Query<float32> {
    return Math.PI;
}

export function getPrincipal(): Query<Principal> {
    return 'rrkah-fqaaa-aaaaa-aaaaq-cai';
}