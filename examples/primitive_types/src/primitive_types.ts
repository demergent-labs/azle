import {
    empty,
    float64,
    float32,
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
    Principal,
    Query,
    reserved
} from 'azle';

export function get_int(): Query<int> {
    return 170_141_183_460_469_231_731_687_303_715_884_105_727n;
}

export function print_int(int: int): Query<int> {
    console.log(typeof int);
    return int;
}

export function get_int64(): Query<int64> {
    return 9_223_372_036_854_775_807n;
}

export function print_int64(int64: int64): Query<int64> {
    console.log(typeof int64);
    return int64;
}

export function get_int32(): Query<int32> {
    return 2_147_483_647;
}

export function print_int32(int32: int32): Query<int32> {
    console.log(typeof int32);
    return int32;
}

export function get_int16(): Query<int16> {
    return 32_767;
}

export function print_int16(int16: int16): Query<int16> {
    console.log(typeof int16);
    return int16;
}

export function get_int8(): Query<int8> {
    return 127;
}

export function print_int8(int8: int8): Query<int8> {
    console.log(typeof int8);
    return int8;
}

export function get_nat(): Query<nat> {
    return 340_282_366_920_938_463_463_374_607_431_768_211_455n;
}

export function print_nat(nat: nat): Query<nat> {
    console.log(typeof nat);
    return nat;
}

export function get_nat64(): Query<nat64> {
    return 18_446_744_073_709_551_615n;
}

export function print_nat64(nat64: nat64): Query<nat64> {
    console.log(typeof nat64);
    return nat64;
}

export function get_nat32(): Query<nat32> {
    return 4_294_967_295;
}

export function print_nat32(nat32: nat32): Query<nat32> {
    console.log(typeof nat32);
    return nat32;
}

export function get_nat16(): Query<nat16> {
    return 65_535;
}

export function print_nat16(nat16: nat16): Query<nat16> {
    console.log(typeof nat16);
    return nat16;
}

export function get_nat8(): Query<nat8> {
    return 255;
}

export function print_nat8(nat8: nat8): Query<nat8> {
    console.log(typeof nat8);
    return nat8;
}

export function get_float64(): Query<float64> {
    return Math.E;
}

export function print_float64(float64: float64): Query<float64> {
    console.log(typeof float64);
    return float64;
}

export function get_float32(): Query<float32> {
    return Math.PI;
}

export function print_float32(float32: float32): Query<float32> {
    console.log(typeof float32);
    return float32;
}

export function get_principal(): Query<Principal> {
    return Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
}

export function print_principal(principal: Principal): Query<Principal> {
    console.log(typeof principal);
    return principal;
}

export function get_null(): Query<null> {
    return null;
}

export function print_null(_null: null): Query<null> {
    console.log(typeof _null);
    return _null;
}

export function get_reserved(): Query<reserved> {
    return 'anything';
}

export function print_reserved(reserved: reserved): Query<reserved> {
    console.log(typeof reserved);
    return reserved;
}

export function get_empty(): Query<empty> {
    throw 'Anything you want';
}

// Note: It is impossible to call this function because it requires an argument
// but there is no way to pass an "empty" value as an argument.
export function print_empty(empty: empty): Query<empty> {
    console.log(typeof empty);
    throw 'Anything you want';
}
