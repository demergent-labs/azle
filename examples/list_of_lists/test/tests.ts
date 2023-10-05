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

export function getTests(listOfListsCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'listOfStringOne test',
            test: async () => {
                const expectedResult = ['hello', 'world'];
                const result =
                    await listOfListsCanister.listOfStringOne(expectedResult);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfStringTwo test',
            test: async () => {
                const expectedResult = [
                    ['hello', 'world'],
                    ['hi', 'earth']
                ];
                const result =
                    await listOfListsCanister.listOfStringTwo(expectedResult);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfStringFour test',
            test: async () => {
                const expectedResult = [
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
                const result =
                    await listOfListsCanister.listOfStringFour(expectedResult);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfListOfInt8',
            test: async () => {
                const expectedResult = [
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
                const result = await listOfListsCanister.listOfListOfInt8();

                return {
                    Ok: arrEqual(result, expectedResult)
                };
            }
        },
        // TODO we don't know we this just started breaking
        // {
        //     name: 'listOfNull test',
        //     test: async () => {
        //         const expectedResult = [
        //             [[null], [null]],
        //             [
        //                 [null, null, null],
        //                 [null, null, null]
        //             ]
        //         ];
        //         const result = await listOfListsCanister.listOfNull(
        //             expectedResult
        //         );

        //         return {
        //             Ok: deepEqual(result, expectedResult)
        //         };
        //     }
        // },
        {
            name: 'listOfBool test',
            test: async () => {
                const expectedResult = [[[false]]];
                const result =
                    await listOfListsCanister.listOfBool(expectedResult);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfString test',
            test: async () => {
                const expectedResult = [[['hello']]];
                const result =
                    await listOfListsCanister.listOfString(expectedResult);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfOptionString test',
            test: async () => {
                const expectedResult: ([] | [string])[][][] = [
                    [[['hello'], []], [[], [], []], [['world']]]
                ];
                const result =
                    await listOfListsCanister.listOfOptionString(
                        expectedResult
                    );

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfEmpty test',
            test: async () => {
                try {
                    const result = await listOfListsCanister.listOfEmpty();
                } catch (error) {
                    return {
                        Ok: (error as any).message.startsWith('Call failed')
                    };
                }

                return {
                    Ok: false
                };
            }
        },
        {
            name: 'listOfReserved test',
            test: async () => {
                const expectedResult = [
                    [[null], [null]],
                    [
                        [null, null, null],
                        [null, null, null]
                    ]
                ];
                const result = await listOfListsCanister.listOfReserved();

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfFunc test',
            test: async () => {
                const expectedResult: [Principal, string][][][] = [
                    [
                        [
                            [Principal.fromText('aaaaa-aa'), 'createCanister'],
                            [Principal.fromText('aaaaa-aa'), 'installCode']
                        ]
                    ]
                ];
                const result =
                    await listOfListsCanister.listOfFunc(expectedResult);

                return {
                    Ok:
                        expectedResult[0][0][0][0].toText() ===
                            result[0][0][0][0].toText() &&
                        expectedResult[0][0][0][1] === result[0][0][0][1] &&
                        expectedResult[0][0][1][0].toText() ===
                            result[0][0][1][0].toText() &&
                        expectedResult[0][0][1][1] === result[0][0][1][1]
                };
            }
        },
        {
            name: 'listOfPrincipal test',
            test: async () => {
                const expectedResult = [[[Principal.fromText('aaaaa-aa')]]];
                const result =
                    await listOfListsCanister.listOfPrincipal(expectedResult);
                const principalEq = (a: any, b: any) => {
                    return (
                        'toText' in a &&
                        'toText' in b &&
                        a.toText() === b.toText()
                    );
                };

                return {
                    Ok:
                        result[0][0][0].toText() ===
                        expectedResult[0][0][0].toText()
                };
            }
        },
        {
            name: 'listOfF64 test',
            test: async () => {
                const expectedResult = [[[1.234]]];
                const result =
                    await listOfListsCanister.listOfF64(expectedResult);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfF32 test',
            test: async () => {
                const expectedResult = [[[1.234]]];
                const result =
                    await listOfListsCanister.listOfF32(expectedResult);

                return {
                    Ok:
                        Math.round(expectedResult[0][0][0]) ===
                        Math.round(result[0][0][0])
                };
            }
        },
        {
            name: 'listOfInt test',
            test: async () => {
                const expectedResult = [
                    [[1n], [2n]],
                    [
                        [1n, 2n, 3n],
                        [4n, 5n, 6n]
                    ]
                ];
                const result =
                    await listOfListsCanister.listOfInt(expectedResult);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfInt64 test',
            test: async () => {
                const expectedResult = [[new BigInt64Array([1n])]];
                const result =
                    await listOfListsCanister.listOfInt64(expectedResult);

                return {
                    Ok: arrEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfInt32 test',
            test: async () => {
                const expectedResult = [[new Int32Array([1])]];
                const result =
                    await listOfListsCanister.listOfInt32(expectedResult);

                return {
                    Ok: arrEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfInt16 test',
            test: async () => {
                const expectedResult = [[new Int16Array([1])]];
                const result =
                    await listOfListsCanister.listOfInt16(expectedResult);

                return {
                    Ok: arrEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfInt8 test',
            test: async () => {
                const expectedResult = [[new Int8Array([1])]];
                const result =
                    await listOfListsCanister.listOfInt8(expectedResult);

                return {
                    Ok: arrEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfNat test',
            test: async () => {
                const expectedResult = [[[1n]]];
                const result =
                    await listOfListsCanister.listOfNat(expectedResult);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfNat64 test',
            test: async () => {
                const expectedResult = [[new BigUint64Array([1n])]];
                const result =
                    await listOfListsCanister.listOfNat64(expectedResult);

                return {
                    Ok: arrEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfNat32 test',
            test: async () => {
                const expectedResult = [[new Uint32Array([1])]];
                const result =
                    await listOfListsCanister.listOfNat32(expectedResult);

                return {
                    Ok: arrEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfNat16 test',
            test: async () => {
                const expectedResult = [[new Uint16Array([1])]];
                const result =
                    await listOfListsCanister.listOfNat16(expectedResult);

                return {
                    Ok: arrEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfNat8 test',
            test: async () => {
                const expectedResult = [[new Uint8Array([1])]];
                const result =
                    await listOfListsCanister.listOfNat8(expectedResult);

                return {
                    Ok: arrEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfRecord test',
            test: async () => {
                const expectedResult = [
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
                const result =
                    await listOfListsCanister.listOfRecord(expectedResult);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfVariant test',
            test: async () => {
                const expectedResult = [
                    [[{ solid: null }], [{ solid: null }]],
                    [
                        [{ solid: null }, { liquid: null }, { gas: null }],
                        [{ liquid: null }, { gas: null }, { gas: null }]
                    ]
                ];
                const result =
                    await listOfListsCanister.listOfVariant(expectedResult);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfBlob test',
            test: async () => {
                const expectedResult = [
                    new Uint8Array([104, 101, 108, 108, 111])
                ];
                const result =
                    await listOfListsCanister.listOfBlob(expectedResult);

                return {
                    Ok: arrEqual(result, expectedResult)
                };
            }
        },
        {
            name: 'listOfListOfBlob test',
            test: async () => {
                const expectedResult = [
                    [new Uint8Array([104, 101, 108, 108, 111])],
                    [new Uint8Array([119, 111, 114, 108, 100])]
                ];
                const result =
                    await listOfListsCanister.listOfListOfBlob(expectedResult);

                return {
                    Ok: arrEqual(result, expectedResult)
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
