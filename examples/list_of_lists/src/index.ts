import { Principal } from '@dfinity/principal';
import {
    blob,
    empty,
    float32,
    float64,
    Func,
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
    Query,
    $query,
    reserved,
    Variant
} from 'azle';

type Person = {
    name: string;
    age: nat8;
};

type State = Variant<{
    solid: null;
    liquid: null;
    gas: null;
}>;

type BasicFunc = Func<(param1: string) => Query<string>>;

$query;
export function list_of_string_one(param: string[]): string[] {
    return param;
}

$query;
export function list_of_string_two(params: string[][]): string[][] {
    return params;
}

$query;
export function list_of_string_four(params: string[][][][]): string[][][][] {
    return params;
}

$query;
export function list_of_list_of_int8(): int8[][][][][][][] {
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
export function list_of_null(param: null[][][]): null[][][] {
    return param;
}

$query;
export function list_of_bool(param: boolean[][][]): boolean[][][] {
    return param;
}

$query;
export function list_of_string(param: string[][][]): string[][][] {
    return param;
}

$query;
export function list_of_option_string(
    param: Opt<string>[][][]
): Opt<string>[][][] {
    return param;
}

$query;
export function list_of_empty(): empty[][][] {
    throw new Error('Anything you want');
}

$query;
export function list_of_reserved(): reserved[][][] {
    return [
        [['A'], ['n']],
        [
            ['y', 't', 'h'],
            ['i', 'n', 'g']
        ]
    ];
}

$query;
export function list_of_func(param: BasicFunc[][][]): BasicFunc[][][] {
    return param;
}

$query;
export function list_of_principal(param: Principal[][][]): Principal[][][] {
    return param;
}

//TODO do I need to test Rejection Code

$query;
export function list_of_f64(param: float64[][][]): float64[][][] {
    return param;
}

$query;
export function list_of_f32(param: float32[][][]): float32[][][] {
    return param;
}

$query;

export function list_of_int(param: int[][][]): int[][][] {
    return param;
}

$query;

export function list_of_int64(param: int64[][][]): int64[][][] {
    return param;
}

$query;

export function list_of_int32(param: int32[][][]): int32[][][] {
    return param;
}

$query;

export function list_of_int16(param: int16[][][]): int16[][][] {
    return param;
}

$query;

export function list_of_int8(param: int8[][][]): int8[][][] {
    return param;
}

$query;

export function list_of_nat(param: nat[][][]): nat[][][] {
    return param;
}

$query;

export function list_of_nat64(param: nat64[][][]): nat64[][][] {
    return param;
}

$query;

export function list_of_nat32(param: nat32[][][]): nat32[][][] {
    return param;
}

$query;

export function list_of_nat16(param: nat16[][][]): nat16[][][] {
    return param;
}

$query;

export function list_of_nat8(param: nat8[][][]): nat8[][][] {
    return param;
}

$query;

export function list_of_record(param: Person[][][]): Person[][][] {
    return param;
}

$query;

export function list_of_variant(param: State[][][]): State[][][] {
    return param;
}

$query;

export function list_of_blob(param: blob[]): blob[] {
    return param;
}

$query;

export function list_of_list_of_blob(param: blob[][]): blob[][] {
    return param;
}
