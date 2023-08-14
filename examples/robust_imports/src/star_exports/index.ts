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
    $query,
    Record,
    Tuple,
    $update,
    Variant
} from './types';

export type Sign = Variant<{
    Positive: null;
    Negative: null;
}>;

export type SignedNaturals = Record<{
    snat: Tuple<[nat, Sign]>;
    snat8: Tuple<[nat8, Sign]>;
    snat16: Tuple<[nat16, Sign]>;
    snat32: Tuple<[nat32, Sign]>;
    snat64: Tuple<[nat64, Sign]>;
}>;

export type Integers = Record<{
    int: int;
    int8: int8;
    int16: int16;
    int32: int32;
    int64: int64;
}>;

export type Naturals = Record<{
    nat: nat;
    nat8: nat8;
    nat16: nat16;
    nat32: nat32;
    nat64: nat64;
}>;

$query;
export function integersToSignedNaturals(ints: Integers): SignedNaturals {
    return {
        snat: [
            absoluteBigInt(ints.int),
            ints.int < 0 ? { Negative: null } : { Positive: null }
        ],
        snat8: [
            Math.abs(ints.int8),
            ints.int8 < 0 ? { Negative: null } : { Positive: null }
        ],
        snat16: [
            Math.abs(ints.int16),
            ints.int16 < 0 ? { Negative: null } : { Positive: null }
        ],
        snat32: [
            Math.abs(ints.int32),
            ints.int32 < 0 ? { Negative: null } : { Positive: null }
        ],
        snat64: [
            absoluteBigInt(ints.int64),
            ints.int64 < 0 ? { Negative: null } : { Positive: null }
        ]
    };
}

$update;
export function toSignedNat(naturals: Naturals, sign: Sign): SignedNaturals {
    return {
        snat: [naturals.nat, sign],
        snat8: [naturals.nat8, sign],
        snat16: [naturals.nat16, sign],
        snat32: [naturals.nat32, sign],
        snat64: [naturals.nat64, sign]
    };
}

function absoluteBigInt(value: bigint) {
    return value < 0n ? -value : value;
}
