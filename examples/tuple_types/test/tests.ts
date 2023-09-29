import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/tuple_types/tuple_types.did';

export function getTests(tupleTypesCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'primitiveOneTupleReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveOneTupleReturnType();

                return {
                    Ok: result[0] === 'Hello'
                };
            }
        },
        {
            name: 'primitiveOneTupleParam',
            test: async () => {
                const result = await tupleTypesCanister.primitiveOneTupleParam([
                    'Yes'
                ]);

                return {
                    Ok: result[0] === 'Yes'
                };
            }
        },
        {
            name: 'primitiveOneTupleInlineReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveOneTupleInlineReturnType();

                return {
                    Ok: result[0] === 'Greenland'
                };
            }
        },
        {
            name: 'primitiveOneTupleInlineParam',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveOneTupleInlineParam([
                        'Rocks'
                    ]);

                return {
                    Ok: result[0] === 'Rocks'
                };
            }
        },
        {
            name: 'primitiveTwoTupleReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveTwoTupleReturnType();

                return {
                    Ok: result[0] === 'Content-Type' && result[1] === 64n
                };
            }
        },
        {
            name: 'primitiveTwoTupleParam',
            test: async () => {
                const result = await tupleTypesCanister.primitiveTwoTupleParam([
                    'Folly',
                    6_433n
                ]);

                return {
                    Ok: result[0] === 'Folly' && result[1] === 6433n
                };
            }
        },
        {
            name: 'primitiveTwoTupleInlineReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveTwoTupleInlineReturnType();

                return {
                    Ok: result[0] === 'Fun' && result[1] === 'Times'
                };
            }
        },
        {
            name: 'primitiveTwoTupleInlineParam',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveTwoTupleInlineParam([
                        'Great',
                        'Days'
                    ]);

                return {
                    Ok: result[0] === 'Great' && result[1] === 'Days'
                };
            }
        },
        {
            name: 'primitiveThreeTupleReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveThreeTupleReturnType();

                return {
                    Ok:
                        result[0] === 'Good' &&
                        result[1] === 454n &&
                        result[2].toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
                };
            }
        },
        {
            name: 'primitiveThreeTupleParam',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveThreeTupleParam([
                        'Antarctica',
                        41_415n,
                        Principal.fromText('aaaaa-aa')
                    ]);

                return {
                    Ok:
                        result[0] === 'Antarctica' &&
                        result[1] === 41_415n &&
                        result[2].toText() === 'aaaaa-aa'
                };
            }
        },
        {
            name: 'primitiveThreeTupleInlineReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveThreeTupleInlineReturnType();

                return {
                    Ok:
                        result[0] === 'Fun' &&
                        result[1] === 101n &&
                        result[2].toText() === 'aaaaa-aa'
                };
            }
        },
        {
            name: 'primitiveThreeTupleInlineParam',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveThreeTupleInlineParam([
                        'Great',
                        300n,
                        Principal.fromText('aaaaa-aa')
                    ]);

                return {
                    Ok:
                        result[0] === 'Great' &&
                        result[1] === 300n &&
                        result[2].toText() === 'aaaaa-aa'
                };
            }
        },
        {
            name: 'complexOneTupleReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexOneTupleReturnType();

                return {
                    Ok: result[0][0] === 'Hello' && result[0][1] === 0n
                };
            }
        },
        {
            name: 'complexOneTupleParam',
            test: async () => {
                const result = await tupleTypesCanister.complexOneTupleParam([
                    ['Goodbye', 1n]
                ]);

                return {
                    Ok: result[0][0] === 'Goodbye' && result[0][1] === 1n
                };
            }
        },
        {
            name: 'complexOneTupleInlineReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexOneTupleInlineReturnType();

                return {
                    Ok: result[0][0] === 'Candy' && result[0][1] === 56n
                };
            }
        },
        {
            name: 'complexOneTupleInlineParam',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexOneTupleInlineParam([
                        ['Mountain', 76n]
                    ]);

                return {
                    Ok: result[0][0] === 'Mountain' && result[0][1] === 76n
                };
            }
        },
        {
            name: 'complexTwoTupleReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexTwoTupleReturnType();

                return {
                    Ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 64n &&
                        result[1].id === '0' &&
                        result[1].primitiveTwoTuple[0] === 'Content-Type' &&
                        result[1].primitiveTwoTuple[1] === 64n
                };
            }
        },
        {
            name: 'complexTwoTupleParam',
            test: async () => {
                const result = await tupleTypesCanister.complexTwoTupleParam([
                    ['Content-Length', 6_422n],
                    {
                        id: '1',
                        primitiveTwoTuple: ['Content-Type', 64n]
                    }
                ]);

                return {
                    Ok:
                        result[0][0] === 'Content-Length' &&
                        result[0][1] === 6_422n &&
                        result[1].id === '1' &&
                        result[1].primitiveTwoTuple[0] === 'Content-Type' &&
                        result[1].primitiveTwoTuple[1] === 64n
                };
            }
        },
        {
            name: 'complexTwoTupleInlineReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexTwoTupleInlineReturnType();

                return {
                    Ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 644n &&
                        result[1].id === '444' &&
                        result[1].primitiveTwoTuple[0] === 'Content-Type' &&
                        result[1].primitiveTwoTuple[1] === 6_422n
                };
            }
        },
        {
            name: 'complexTwoTupleInlineParam',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexTwoTupleInlineParam([
                        ['Content-Length', 6_422n],
                        {
                            id: '133',
                            primitiveTwoTuple: ['Content-Type', 6_224n]
                        }
                    ]);

                return {
                    Ok:
                        result[0][0] === 'Content-Length' &&
                        result[0][1] === 6_422n &&
                        result[1].id === '133' &&
                        result[1].primitiveTwoTuple[0] === 'Content-Type' &&
                        result[1].primitiveTwoTuple[1] === 6_224n
                };
            }
        },
        {
            name: 'complexThreeTupleReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexThreeTupleReturnType();

                return {
                    Ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 64n &&
                        result[1].id === '0' &&
                        result[1].primitiveTwoTuple[0] === 'Content-Type' &&
                        result[1].primitiveTwoTuple[1] === 64n &&
                        'Bad' in result[2] &&
                        result[2].Bad[0][0] === 'Content-Type' &&
                        result[2].Bad[0][1] === 64n &&
                        result[2].Bad[1].id === '1' &&
                        result[2].Bad[1].primitiveTwoTuple[0] ===
                            'Content-Type' &&
                        result[2].Bad[1].primitiveTwoTuple[1] === 64n &&
                        'Good' in result[2].Bad[2]
                };
            }
        },
        {
            name: 'complexThreeTupleParam',
            test: async () => {
                const result = await tupleTypesCanister.complexThreeTupleParam([
                    ['Content-Type', 64n],
                    {
                        id: '0',
                        primitiveTwoTuple: ['Content-Type', 64n]
                    },
                    {
                        Bad: [
                            ['Content-Type', 64n],
                            {
                                id: '1',
                                primitiveTwoTuple: ['Content-Type', 64n]
                            },
                            {
                                Good: null
                            }
                        ]
                    }
                ]);

                return {
                    Ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 64n &&
                        result[1].id === '0' &&
                        result[1].primitiveTwoTuple[0] === 'Content-Type' &&
                        result[1].primitiveTwoTuple[1] === 64n &&
                        'Bad' in result[2] &&
                        result[2].Bad[0][0] === 'Content-Type' &&
                        result[2].Bad[0][1] === 64n &&
                        result[2].Bad[1].id === '1' &&
                        result[2].Bad[1].primitiveTwoTuple[0] ===
                            'Content-Type' &&
                        result[2].Bad[1].primitiveTwoTuple[1] === 64n &&
                        'Good' in result[2].Bad[2]
                };
            }
        },
        {
            name: 'complexThreeTupleInlineReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexThreeTupleInlineReturnType();

                return {
                    Ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 64n &&
                        result[1].id === '0' &&
                        result[1].primitiveTwoTuple[0] === 'Content-Type' &&
                        result[1].primitiveTwoTuple[1] === 64n &&
                        'Bad' in result[2] &&
                        result[2].Bad[0][0] === 'Content-Type' &&
                        result[2].Bad[0][1] === 64n &&
                        result[2].Bad[1].id === '1' &&
                        result[2].Bad[1].primitiveTwoTuple[0] ===
                            'Content-Type' &&
                        result[2].Bad[1].primitiveTwoTuple[1] === 64n &&
                        'Good' in result[2].Bad[2]
                };
            }
        },
        {
            name: 'complexThreeTupleInlineParam',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexThreeTupleInlineParam([
                        ['Content-Type', 64n],
                        {
                            id: '0',
                            primitiveTwoTuple: ['Content-Type', 64n]
                        },
                        {
                            Bad: [
                                ['Content-Type', 64n],
                                {
                                    id: '1',
                                    primitiveTwoTuple: ['Content-Type', 64n]
                                },
                                {
                                    Good: null
                                }
                            ]
                        }
                    ]);

                return {
                    Ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 64n &&
                        result[1].id === '0' &&
                        result[1].primitiveTwoTuple[0] === 'Content-Type' &&
                        result[1].primitiveTwoTuple[1] === 64n &&
                        'Bad' in result[2] &&
                        result[2].Bad[0][0] === 'Content-Type' &&
                        result[2].Bad[0][1] === 64n &&
                        result[2].Bad[1].id === '1' &&
                        result[2].Bad[1].primitiveTwoTuple[0] ===
                            'Content-Type' &&
                        result[2].Bad[1].primitiveTwoTuple[1] === 64n &&
                        'Good' in result[2].Bad[2]
                };
            }
        },
        {
            name: 'tupleArrayParamsAndReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.tupleArrayParamsAndReturnType([
                        ['Content-Type', 'application/json'],
                        ['Accept-Ranges', 'bytes']
                    ]);

                return {
                    Ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 'application/json' &&
                        result[1][0] === 'Accept-Ranges' &&
                        result[1][1] === 'bytes'
                };
            }
        },
        {
            name: 'tupleArrayRecordField',
            test: async () => {
                const result = await tupleTypesCanister.tupleArrayRecordField();

                return {
                    Ok:
                        result.headers[0][0] === 'Content-Type' &&
                        result.headers[0][1] === 'application/json' &&
                        result.headers[1][0] === 'Accept-Ranges' &&
                        result.headers[1][1] === 'bytes'
                };
            }
        },
        {
            name: 'tupleArrayVariantField',
            test: async () => {
                const result =
                    await tupleTypesCanister.tupleArrayVariantField();

                return {
                    Ok:
                        'WithHeaders' in result &&
                        result.WithHeaders[0][0] === 'Content-Type' &&
                        result.WithHeaders[0][1] === 'application/json' &&
                        result.WithHeaders[1][0] === 'Accept-Ranges' &&
                        result.WithHeaders[1][1] === 'bytes'
                };
            }
        },
        {
            name: 'nested tuple test',
            test: async () => {
                const expectedResult: [[string, [number, number]], bigint] = [
                    ['hello', [5, 10]],
                    123n
                ];
                const result =
                    await tupleTypesCanister.nestedTupleQuery(expectedResult);

                return {
                    Ok:
                        result[1] == expectedResult[1] &&
                        result[0][0] == expectedResult[0][0] &&
                        result[0][1][0] == expectedResult[0][1][0] &&
                        result[0][1][1] == expectedResult[0][1][1]
                };
            }
        }
    ];
}
