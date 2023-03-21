import { Principal } from '@dfinity/principal';
import {
    blob,
    empty,
    float32,
    float64,
    Func,
    Query,
    int,
    int16,
    int32,
    int64,
    int8,
    nat,
    nat16,
    nat32,
    nat64,
    nat8,
    Opt,
    $query,
    Record,
    reserved,
    Variant
} from 'azle';

type Person = Record<{
    name: string;
    age: nat8;
}>;

type State = Variant<{
    solid: null;
    liquid: null;
    gas: null;
}>;

type BasicFunc = Func<Query<(param1: string) => string>>;

$query;
export function listOfStringOne(param: string[]): string[] {
    return param;
}

$query;
export function listOfStringTwo(params: string[][]): string[][] {
    return params;
}

$query;
export function listOfStringFour(params: string[][][][]): string[][][][] {
    return params;
}

$query;
export function listOfListOfInt8(): int8[][][][][][][] {
    return [
        [
            [
                [
                    [
                        [[1], [2]],
                        [
                            [1, 2, 3],
                            [4, 5, 6]
                        ]
                    ]
                ],
                [[[[1]]], [[[2]]]],
                [[[[3]]]]
            ]
        ],
        [
            [[[[[1]]]], [[[[2]]]]],
            [[[[[3]]]], [[[[4]]]]]
        ]
    ];
}

$query;
export function listOfNull(param: null[][][]): null[][][] {
    return param;
}

$query;
export function listOfBool(param: boolean[][][]): boolean[][][] {
    return param;
}

$query;
export function listOfString(param: string[][][]): string[][][] {
    return param;
}

$query;
export function listOfOptionString(
    param: Opt<string>[][][]
): Opt<string>[][][] {
    return param;
}

$query;
export function listOfEmpty(): empty[][][] {
    throw new Error('Anything you want');
}

$query;
export function listOfReserved(): reserved[][][] {
    return [
        [['A'], ['n']],
        [
            ['y', 't', 'h'],
            ['i', 'n', 'g']
        ]
    ];
}

$query;
export function listOfFunc(param: BasicFunc[][][]): BasicFunc[][][] {
    return param;
}

$query;
export function listOfPrincipal(param: Principal[][][]): Principal[][][] {
    return param;
}

//TODO do I need to test Rejection Code

$query;
export function listOfF64(param: float64[][][]): float64[][][] {
    return param;
}

$query;
export function listOfF32(param: float32[][][]): float32[][][] {
    return param;
}

$query;

export function listOfInt(param: int[][][]): int[][][] {
    return param;
}

$query;

export function listOfInt64(param: int64[][][]): int64[][][] {
    return param;
}

$query;

export function listOfInt32(param: int32[][][]): int32[][][] {
    return param;
}

$query;

export function listOfInt16(param: int16[][][]): int16[][][] {
    return param;
}

$query;

export function listOfInt8(param: int8[][][]): int8[][][] {
    return param;
}

$query;

export function listOfNat(param: nat[][][]): nat[][][] {
    return param;
}

$query;

export function listOfNat64(param: nat64[][][]): nat64[][][] {
    return param;
}

$query;

export function listOfNat32(param: nat32[][][]): nat32[][][] {
    return param;
}

$query;

export function listOfNat16(param: nat16[][][]): nat16[][][] {
    return param;
}

$query;

export function listOfNat8(param: nat8[][][]): nat8[][][] {
    return param;
}

$query;

export function listOfRecord(param: Person[][][]): Person[][][] {
    return param;
}

$query;

export function listOfVariant(param: State[][][]): State[][][] {
    return param;
}

$query;

export function listOfBlob(param: blob[]): blob[] {
    return param;
}

$query;

export function listOfListOfBlob(param: blob[][]): blob[][] {
    return param;
}
