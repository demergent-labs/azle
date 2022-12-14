import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/list_of_lists/list_of_lists.did';
import { ActorSubclass } from '@dfinity/agent';
import { deepEqual } from 'fast-equals';
import { Principal } from '@dfinity/principal';

type DeepArray<T> = arr | Array<arr | DeepArray<T>>;

type arr =
    | Int8Array
    | Int16Array
    | Int32Array
    | BigInt64Array
    | Uint8Array
    | Uint16Array
    | Uint32Array
    | BigUint64Array;

export function get_tests(
    list_of_lists_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'list_of_string_one test',
            test: async () => {
                const expected_result = ['hello', 'world'];
                const result = await list_of_lists_canister.list_of_string_one(
                    expected_result
                );

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_string_two test',
            test: async () => {
                const expected_result = [
                    ['hello', 'world'],
                    ['hi', 'earth']
                ];
                const result = await list_of_lists_canister.list_of_string_two(
                    expected_result
                );

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_string_four test',
            test: async () => {
                const expected_result = [
                    [
                        [
                            ['hello', 'world'],
                            ['hi', 'world']
                        ],
                        [
                            ['good bye', 'world'],
                            ['take care', 'world']
                        ]
                    ],
                    [
                        [
                            ['hola', 'mundo'],
                            ['buenos', 'días', 'mundo']
                        ],
                        [
                            ['adios', 'mundo'],
                            ['cuídate', 'mundo']
                        ]
                    ]
                ];
                const result = await list_of_lists_canister.list_of_string_four(
                    expected_result
                );

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_list_of_int8',
            test: async () => {
                const expected_result = [
                    [
                        [
                            [
                                [
                                    [new Int8Array([1]), new Int8Array([2])],
                                    [
                                        new Int8Array([1, 2, 3]),
                                        new Int8Array([4, 5, 6])
                                    ]
                                ]
                            ],
                            [[[new Int8Array([1])]], [[new Int8Array([2])]]],
                            [[[new Int8Array([3])]]]
                        ]
                    ],
                    [
                        [[[[new Int8Array([1])]]], [[[new Int8Array([2])]]]],
                        [[[[new Int8Array([3])]]], [[[new Int8Array([4])]]]]
                    ]
                ];
                const result =
                    await list_of_lists_canister.list_of_list_of_int8();

                return {
                    ok: arrEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_null test',
            test: async () => {
                const expected_result = [
                    [[null], [null]],
                    [
                        [null, null, null],
                        [null, null, null]
                    ]
                ];
                const result = await list_of_lists_canister.list_of_null(
                    expected_result
                );

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_bool test',
            test: async () => {
                const expected_result = [[[false]]];
                const result = await list_of_lists_canister.list_of_bool(
                    expected_result
                );

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_string test',
            test: async () => {
                const expected_result = [[['hello']]];
                const result = await list_of_lists_canister.list_of_string(
                    expected_result
                );

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_option_string test',
            test: async () => {
                const expected_result: ([] | [string])[][][] = [
                    [[['hello'], []], [[], [], []], [['world']]]
                ];
                const result =
                    await list_of_lists_canister.list_of_option_string(
                        expected_result
                    );

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_empty test',
            test: async () => {
                try {
                    const result = await list_of_lists_canister.list_of_empty();
                } catch (error) {
                    return {
                        ok: (error as any).message.startsWith('Call failed')
                    };
                }

                return {
                    ok: false
                };
            }
        },
        {
            name: 'list_of_reserved test',
            test: async () => {
                const expected_result = [
                    [[null], [null]],
                    [
                        [null, null, null],
                        [null, null, null]
                    ]
                ];
                const result = await list_of_lists_canister.list_of_reserved();

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_func test',
            test: async () => {
                const expected_result: [Principal, string][][][] = [
                    [
                        [
                            [Principal.fromText('aaaaa-aa'), 'create_canister'],
                            [Principal.fromText('aaaaa-aa'), 'install_code']
                        ]
                    ]
                ];
                const result = await list_of_lists_canister.list_of_func(
                    expected_result
                );

                return {
                    ok:
                        expected_result[0][0][0][0].toText() ===
                            result[0][0][0][0].toText() &&
                        expected_result[0][0][0][1] === result[0][0][0][1] &&
                        expected_result[0][0][1][0].toText() ===
                            result[0][0][1][0].toText() &&
                        expected_result[0][0][1][1] === result[0][0][1][1]
                };
            }
        },
        {
            name: 'list_of_principal test',
            test: async () => {
                const expected_result = [[[Principal.fromText('aaaaa-aa')]]];
                const result = await list_of_lists_canister.list_of_principal(
                    expected_result
                );
                const principal_eq = (a: any, b: any) => {
                    return (
                        'toText' in a &&
                        'toText' in b &&
                        a.toText() === b.toText()
                    );
                };

                return {
                    ok:
                        result[0][0][0].toText() ===
                        expected_result[0][0][0].toText()
                };
            }
        },
        {
            name: 'list_of_f64 test',
            test: async () => {
                const expected_result = [[[1.234]]];
                const result = await list_of_lists_canister.list_of_f64(
                    expected_result
                );

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_f32 test',
            test: async () => {
                const expected_result = [[[1.234]]];
                const result = await list_of_lists_canister.list_of_f32(
                    expected_result
                );

                return {
                    ok:
                        Math.round(expected_result[0][0][0]) ===
                        Math.round(result[0][0][0])
                };
            }
        },
        {
            name: 'list_of_int test',
            test: async () => {
                const expected_result = [
                    [[1n], [2n]],
                    [
                        [1n, 2n, 3n],
                        [4n, 5n, 6n]
                    ]
                ];
                const result = await list_of_lists_canister.list_of_int(
                    expected_result
                );

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_int64 test',
            test: async () => {
                const expected_result = [[new BigInt64Array([1n])]];
                const result = await list_of_lists_canister.list_of_int64(
                    expected_result
                );

                return {
                    ok: arrEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_int32 test',
            test: async () => {
                const expected_result = [[new Int32Array([1])]];
                const result = await list_of_lists_canister.list_of_int32(
                    expected_result
                );

                return {
                    ok: arrEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_int16 test',
            test: async () => {
                const expected_result = [[new Int16Array([1])]];
                const result = await list_of_lists_canister.list_of_int16(
                    expected_result
                );

                return {
                    ok: arrEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_int8 test',
            test: async () => {
                const expected_result = [[new Int8Array([1])]];
                const result = await list_of_lists_canister.list_of_int8(
                    expected_result
                );

                return {
                    ok: arrEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_nat test',
            test: async () => {
                const expected_result = [[[1n]]];
                const result = await list_of_lists_canister.list_of_nat(
                    expected_result
                );

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_nat64 test',
            test: async () => {
                const expected_result = [[new BigUint64Array([1n])]];
                const result = await list_of_lists_canister.list_of_nat64(
                    expected_result
                );

                return {
                    ok: arrEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_nat32 test',
            test: async () => {
                const expected_result = [[new Uint32Array([1])]];
                const result = await list_of_lists_canister.list_of_nat32(
                    expected_result
                );

                return {
                    ok: arrEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_nat16 test',
            test: async () => {
                const expected_result = [[new Uint16Array([1])]];
                const result = await list_of_lists_canister.list_of_nat16(
                    expected_result
                );

                return {
                    ok: arrEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_nat8 test',
            test: async () => {
                const expected_result = [[new Uint8Array([1])]];
                const result = await list_of_lists_canister.list_of_nat8(
                    expected_result
                );

                return {
                    ok: arrEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_record test',
            test: async () => {
                const expected_result = [
                    [
                        [{ name: 'Turing', age: 41 }],
                        [{ name: 'Hopper', age: 85 }],
                        [{ name: 'Dijkstra', age: 72 }]
                    ],
                    [
                        [
                            { name: 'Blinn', age: 73 },
                            { name: 'Catmull', age: 77 },
                            { name: 'Clark', age: 78 },
                            { name: 'Newell', age: 69 },
                            { name: 'Warnock', age: 82 }
                        ],
                        [{ name: 'Phong', age: 32 }]
                    ]
                ];
                const result = await list_of_lists_canister.list_of_record(
                    expected_result
                );

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_variant test',
            test: async () => {
                const expected_result = [
                    [[{ solid: null }], [{ solid: null }]],
                    [
                        [{ solid: null }, { liquid: null }, { gas: null }],
                        [{ liquid: null }, { gas: null }, { gas: null }]
                    ]
                ];
                const result = await list_of_lists_canister.list_of_variant(
                    expected_result
                );

                return {
                    ok: deepEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_blob test',
            test: async () => {
                const expected_result = [
                    new Uint8Array([104, 101, 108, 108, 111])
                ];
                const result = await list_of_lists_canister.list_of_blob(
                    expected_result
                );

                return {
                    ok: arrEqual(result, expected_result)
                };
            }
        },
        {
            name: 'list_of_list_of_blob test',
            test: async () => {
                const expected_result = [
                    [new Uint8Array([104, 101, 108, 108, 111])],
                    [new Uint8Array([119, 111, 114, 108, 100])]
                ];
                const result =
                    await list_of_lists_canister.list_of_list_of_blob(
                        expected_result
                    );

                return {
                    ok: arrEqual(result, expected_result)
                };
            }
        }
    ];
}

function arrEqual<T>(a: DeepArray<T>, b: DeepArray<T>): boolean {
    if (Array.isArray(a) && Array.isArray(b)) {
        return (
            a.length === b.length &&
            a.every((value, index) => arrEqual(value, b[index]))
        );
    }
    if (Array.isArray(a) || Array.isArray(b)) {
        return false;
    }
    return (
        a.length === b.length && a.every((value, index) => value === b[index])
    );
}
