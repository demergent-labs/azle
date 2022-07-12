import {
    Query,
    empty,
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
    reserved
} from 'azle';

export function getInt(): Query<int> {
    return 170141183460469231731687303715884105727n;
}

export function printInt(int: int): Query<int> {
    console.log(typeof int);
    return int;
}

export function getInt64(): Query<int64> {
    return 9223372036854775807n;
}

export function printInt64(int64: int64): Query<int64> {
    console.log(typeof int64);
    return int64;
}

export function getInt32(): Query<int32> {
    return 2147483647;
}

export function printInt32(int32: int32): Query<int32> {
    console.log(typeof int32);
    return int32;
}

export function getInt16(): Query<int16> {
    return 32767;
}

export function printInt16(int16: int16): Query<int16> {
    console.log(typeof int16);
    return int16;
}

export function getInt8(): Query<int8> {
    return 127;
}

export function printInt8(int8: int8): Query<int8> {
    console.log(typeof int8);
    return int8;
}

export function getNat(): Query<nat> {
    return 340282366920938463463374607431768211455n;
}

export function printNat(nat: nat): Query<nat> {
    console.log(typeof nat);
    return nat;
}

export function getNat64(): Query<nat64> {
    return 18446744073709551615n;
}

export function printNat64(nat64: nat64): Query<nat64> {
    console.log(typeof nat64);
    return nat64;
}

export function getNat32(): Query<nat32> {
    return 4294967295;
}

export function printNat32(nat32: nat32): Query<nat32> {
    console.log(typeof nat32);
    return nat32;
}

export function getNat16(): Query<nat16> {
    return 65535;
}

export function printNat16(nat16: nat16): Query<nat16> {
    console.log(typeof nat16);
    return nat16;
}

export function getNat8(): Query<nat8> {
    return 255;
}

export function printNat8(nat8: nat8): Query<nat8> {
    console.log(typeof nat8);
    return nat8;
}

export function getFloat64(): Query<float64> {
    return Math.E;
}

export function printFloat64(float64: float64): Query<float64> {
    console.log(typeof float64);
    return float64;
}

export function getFloat32(): Query<float32> {
    return Math.PI;
}

export function printFloat32(float32: float32): Query<float32> {
    console.log(typeof float32);
    return float32;
}

export function getPrincipal(): Query<Principal> {
    return Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
}

export function printPrincipal(principal: Principal): Query<Principal> {
    console.log(typeof principal);
    return principal;
}

// TODO It looks like we can't return null in a record
export function getNull(): Query<null> {
    return null;
}

export function printNull(_null: null): Query<null> {
    console.log(typeof _null);
    return _null;
}

type NullRecord = {
    prop: null;
};

export function getNullRecord(): Query<NullRecord> {
    return {
        prop: null
    };
}

export function getReserved(): Query<reserved> {
    return 'anything';
}

export function printReserved(reserved: reserved): Query<reserved> {
    console.log(typeof reserved);
    return reserved;
}

export function getEmpty(): Query<empty> {
    throw 'Anything you want';
}

// Note: It is impossible to call this function because it requires an argument
// but there is no way to pass an "empty" value as an argument.
export function printEmpty(empty: empty): Query<empty> {
    console.log(typeof empty);
    throw 'Anything you want';
}
