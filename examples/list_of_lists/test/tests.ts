import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { fail, Test, test, testEquality } from 'azle/test';

import { _SERVICE } from '../dfx_generated/list_of_lists/list_of_lists.did';

export function getTests(listOfListsCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'listOfStringOne test',
            test: async () => {
                const expectedResult = ['hello', 'world'];
                const result =
                    await listOfListsCanister.listOfStringOne(expectedResult);

                return testEquality(result, expectedResult);
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

                return testEquality(result, expectedResult);
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

                return testEquality(result, expectedResult);
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

                return testEquality(result, expectedResult);
            }
        },
        // TODO we don't know we this just started breaking
        // https://github.com/demergent-labs/azle/issues/1453
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

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfString test',
            test: async () => {
                const expectedResult = [[['hello']]];
                const result =
                    await listOfListsCanister.listOfString(expectedResult);

                return testEquality(result, expectedResult);
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

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfEmpty test',
            test: async () => {
                try {
                    await listOfListsCanister.listOfEmpty();
                } catch (error) {
                    return test(
                        (error as any).message.startsWith('Call failed')
                    );
                }

                return fail();
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

                return testEquality(result, expectedResult);
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

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfPrincipal test',
            test: async () => {
                const expectedResult = [[[Principal.fromText('aaaaa-aa')]]];
                const result =
                    await listOfListsCanister.listOfPrincipal(expectedResult);

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfF64 test',
            test: async () => {
                const expectedResult = [[[1.234]]];
                const result =
                    await listOfListsCanister.listOfF64(expectedResult);

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfF32 test',
            test: async () => {
                const expectedResult = [[[1.234]]];
                const result =
                    await listOfListsCanister.listOfF32(expectedResult);

                return testEquality(
                    Math.round(result[0][0][0]),
                    Math.round(expectedResult[0][0][0])
                );
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

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfInt64 test',
            test: async () => {
                const expectedResult = [[new BigInt64Array([1n])]];
                const result =
                    await listOfListsCanister.listOfInt64(expectedResult);

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfInt32 test',
            test: async () => {
                const expectedResult = [[new Int32Array([1])]];
                const result =
                    await listOfListsCanister.listOfInt32(expectedResult);

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfInt16 test',
            test: async () => {
                const expectedResult = [[new Int16Array([1])]];
                const result =
                    await listOfListsCanister.listOfInt16(expectedResult);

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfInt8 test',
            test: async () => {
                const expectedResult = [[new Int8Array([1])]];
                const result =
                    await listOfListsCanister.listOfInt8(expectedResult);

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfNat test',
            test: async () => {
                const expectedResult = [[[1n]]];
                const result =
                    await listOfListsCanister.listOfNat(expectedResult);

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfNat64 test',
            test: async () => {
                const expectedResult = [[new BigUint64Array([1n])]];
                const result =
                    await listOfListsCanister.listOfNat64(expectedResult);

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfNat32 test',
            test: async () => {
                const expectedResult = [[new Uint32Array([1])]];
                const result =
                    await listOfListsCanister.listOfNat32(expectedResult);

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfNat16 test',
            test: async () => {
                const expectedResult = [[new Uint16Array([1])]];
                const result =
                    await listOfListsCanister.listOfNat16(expectedResult);

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'listOfNat8 test',
            test: async () => {
                const expectedResult = [[new Uint8Array([1])]];
                const result =
                    await listOfListsCanister.listOfNat8(expectedResult);

                return testEquality(result, expectedResult);
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

                return testEquality(result, expectedResult);
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

                return testEquality(result, expectedResult);
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

                return testEquality(result, expectedResult);
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

                return testEquality(result, expectedResult);
            }
        }
    ];
}
