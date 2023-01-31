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

export function list_of_string_one(param: string[]): Query<string[]> {
    return param;
}

export function list_of_string_two(params: string[][]): Query<string[][]> {
    return params;
}

export function list_of_string_four(
    params: string[][][][]
): Query<string[][][][]> {
    return params;
}

export function list_of_list_of_int8(): Query<int8[][][][][][][]> {
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

export function list_of_null(param: null[][][]): Query<null[][][]> {
    return param;
}

export function list_of_bool(param: boolean[][][]): Query<boolean[][][]> {
    return param;
}

export function list_of_string(param: string[][][]): Query<string[][][]> {
    return param;
}

export function list_of_option_string(
    param: Opt<string>[][][]
): Query<Opt<string>[][][]> {
    return param;
}

export function list_of_empty(): Query<empty[][][]> {
    throw new Error('Anything you want');
}

export function list_of_reserved(): Query<reserved[][][]> {
    return [
        [['A'], ['n']],
        [
            ['y', 't', 'h'],
            ['i', 'n', 'g']
        ]
    ];
}

export function list_of_func(param: BasicFunc[][][]): Query<BasicFunc[][][]> {
    return param;
}

export function list_of_principal(
    param: Principal[][][]
): Query<Principal[][][]> {
    return param;
}

//TODO do I need to test Rejection Code

export function list_of_f64(param: float64[][][]): Query<float64[][][]> {
    return param;
}

export function list_of_f32(param: float32[][][]): Query<float32[][][]> {
    return param;
}

export function list_of_int(param: int[][][]): Query<int[][][]> {
    return param;
}

export function list_of_int64(param: int64[][][]): Query<int64[][][]> {
    return param;
}

export function list_of_int32(param: int32[][][]): Query<int32[][][]> {
    return param;
}

export function list_of_int16(param: int16[][][]): Query<int16[][][]> {
    return param;
}

export function list_of_int8(param: int8[][][]): Query<int8[][][]> {
    return param;
}

export function list_of_nat(param: nat[][][]): Query<nat[][][]> {
    return param;
}

export function list_of_nat64(param: nat64[][][]): Query<nat64[][][]> {
    return param;
}

export function list_of_nat32(param: nat32[][][]): Query<nat32[][][]> {
    return param;
}

export function list_of_nat16(param: nat16[][][]): Query<nat16[][][]> {
    return param;
}

export function list_of_nat8(param: nat8[][][]): Query<nat8[][][]> {
    return param;
}

export function list_of_record(param: Person[][][]): Query<Person[][][]> {
    return param;
}

export function list_of_variant(param: State[][][]): Query<State[][][]> {
    return param;
}

export function list_of_blob(param: blob[]): Query<blob[]> {
    return param;
}

export function list_of_list_of_blob(param: blob[][]): Query<blob[][]> {
    return param;
}

// class API

import { query } from 'azle';

export default class {
    @query
    list_of_string_one(param: string[]): string[] {
        return param;
    }

    @query
    list_of_string_two(params: string[][]): string[][] {
        return params;
    }

    @query
    list_of_string_four(params: string[][][][]): string[][][][] {
        return params;
    }

    @query
    list_of_list_of_int8(): int8[][][][][][][] {
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

    @query
    list_of_null(param: null[][][]): null[][][] {
        return param;
    }

    @query
    list_of_bool(param: boolean[][][]): boolean[][][] {
        return param;
    }

    @query
    list_of_string(param: string[][][]): string[][][] {
        return param;
    }

    @query
    list_of_option_string(param: Opt<string>[][][]): Opt<string>[][][] {
        return param;
    }

    @query
    list_of_empty(): empty[][][] {
        throw new Error('Anything you want');
    }

    @query
    list_of_reserved(): reserved[][][] {
        return [
            [['A'], ['n']],
            [
                ['y', 't', 'h'],
                ['i', 'n', 'g']
            ]
        ];
    }

    @query
    list_of_func(param: BasicFunc[][][]): BasicFunc[][][] {
        return param;
    }

    @query
    list_of_principal(param: Principal[][][]): Principal[][][] {
        return param;
    }

    //TODO do I need to test Rejection Code

    @query
    list_of_f64(param: float64[][][]): float64[][][] {
        return param;
    }

    @query
    list_of_f32(param: float32[][][]): float32[][][] {
        return param;
    }

    @query
    list_of_int(param: int[][][]): int[][][] {
        return param;
    }

    @query
    list_of_int64(param: int64[][][]): int64[][][] {
        return param;
    }

    @query
    list_of_int32(param: int32[][][]): int32[][][] {
        return param;
    }

    @query
    list_of_int16(param: int16[][][]): int16[][][] {
        return param;
    }

    @query
    list_of_int8(param: int8[][][]): int8[][][] {
        return param;
    }

    @query
    list_of_nat(param: nat[][][]): nat[][][] {
        return param;
    }

    @query
    list_of_nat64(param: nat64[][][]): nat64[][][] {
        return param;
    }

    @query
    list_of_nat32(param: nat32[][][]): nat32[][][] {
        return param;
    }

    @query
    list_of_nat16(param: nat16[][][]): nat16[][][] {
        return param;
    }

    @query
    list_of_nat8(param: nat8[][][]): nat8[][][] {
        return param;
    }

    @query
    list_of_record(param: Person[][][]): Person[][][] {
        return param;
    }

    @query
    list_of_variant(param: State[][][]): State[][][] {
        return param;
    }

    @query
    list_of_blob(param: blob[]): blob[] {
        return param;
    }

    @query
    list_of_list_of_blob(param: blob[][]): blob[][] {
        return param;
    }
}
