import {
    int,
    int8,
    int16,
    int32,
    int64,
    nat,
    nat8,
    nat16,
    nat32,
    nat64,
    float32,
    float64
} from 'azle';

export function returnInvalidNumber(): number {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidInt(): int {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidInt8(): int8 {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidInt16(): int16 {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidInt32(): int32 {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidInt64(): int64 {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidNat(): nat {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidNat8(): nat8 {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidNat16(): nat16 {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidNat32(): nat32 {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidNat64(): nat64 {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidFloat32(): float32 {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidFloat64(): float64 {
    // @ts-expect-error
    return 'invalid type';
}
