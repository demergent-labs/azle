import {
    Query,
    // TODO we need Int or i128...probably both
    i64,
    i32,
    i16,
    i8,
    Nat,
    // TODO we also need u128
    u64,
    u32,
    u16,
    u8
} from 'azle';

// TODO not fully representable with native JS numbers
// export function getInt(): Query<Int> {
//     return 170141183460469231731687303715884105727;
// }

// TODO not fully representable with native JS numbers
// export function geti128(): Query<i128> {
//     return 170141183460469231731687303715884105727;
// }

// TODO not fully representable with native JS numbers
// export function geti64(): Query<i64> {
//     return 9223372036854775807;
// }

export function geti32(): Query<i32> {
    return 2147483647;
}

export function geti16(): Query<i16> {
    return 32767;
}

export function geti8(): Query<i8> {
    return 127;
}

// TODO not fully representable with native JS numbers
// export function getNat(): Query<Nat> {
//     return 340282366920938463463374607431768211455;
// }

// TODO not fully representable with native JS numbers
// export function getU128(): Query<u128> {
//     return 340282366920938463463374607431768211455;
// }

// TODO not fully representable with native JS numbers
// export function getu64(): Query<u64> {
//     return 18446744073709551615;
// }

export function getu32(): Query<u32> {
    return 4294967295;
}

export function getu16(): Query<u16> {
    return 65535;
}

export function getu8(): Query<u8> {
    return 255;
}