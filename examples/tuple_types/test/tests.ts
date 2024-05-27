import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { Test, testEquality } from 'azle/test';

import {
    ComplexOneTuple,
    ComplexThreeTuple,
    ComplexTwoTuple,
    Header,
    PrimitiveTwoTuple,
    StreamingCallbackType
} from '../src';
import { _SERVICE } from './dfx_generated/tuple_types/tuple_types.did';

export type PrimitiveThreeTuple = [string, bigint, Principal];

export function getTests(tupleTypesCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'primitiveOneTupleReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveOneTupleReturnType();

                return testEquality(result, ['Hello']);
            }
        },
        {
            name: 'primitiveOneTupleParam',
            test: async () => {
                const result = await tupleTypesCanister.primitiveOneTupleParam([
                    'Yes'
                ]);

                return testEquality(result, ['Yes']);
            }
        },
        {
            name: 'primitiveOneTupleInlineReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveOneTupleInlineReturnType();

                return testEquality(result, ['Greenland']);
            }
        },
        {
            name: 'primitiveOneTupleInlineParam',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveOneTupleInlineParam([
                        'Rocks'
                    ]);

                return testEquality(result, ['Rocks']);
            }
        },
        {
            name: 'primitiveTwoTupleReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveTwoTupleReturnType();

                return testEquality(result, ['Content-Type', 64n]);
            }
        },
        {
            name: 'primitiveTwoTupleParam',
            test: async () => {
                const tuple: PrimitiveTwoTuple = ['Folly', 6_433n];
                const result =
                    await tupleTypesCanister.primitiveTwoTupleParam(tuple);

                return testEquality(result, tuple);
            }
        },
        {
            name: 'primitiveTwoTupleInlineReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveTwoTupleInlineReturnType();

                return testEquality(result, ['Fun', 'Times']);
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

                return testEquality(result, ['Great', 'Days']);
            }
        },
        {
            name: 'primitiveThreeTupleReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveThreeTupleReturnType();
                const expected = [
                    'Good',
                    454n,
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                ];

                return testEquality(result, expected);
            }
        },
        {
            name: 'primitiveThreeTupleParam',
            test: async () => {
                const tuple: PrimitiveThreeTuple = [
                    'Antarctica',
                    41_415n,
                    Principal.fromText('aaaaa-aa')
                ];
                const result =
                    await tupleTypesCanister.primitiveThreeTupleParam(tuple);

                return testEquality(result, tuple);
            }
        },
        {
            name: 'primitiveThreeTupleInlineReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.primitiveThreeTupleInlineReturnType();

                return testEquality(result, [
                    'Fun',
                    101n,
                    Principal.fromText('aaaaa-aa')
                ]);
            }
        },
        {
            name: 'primitiveThreeTupleInlineParam',
            test: async () => {
                const tuple: PrimitiveThreeTuple = [
                    'Great',
                    300n,
                    Principal.fromText('aaaaa-aa')
                ];
                const result =
                    await tupleTypesCanister.primitiveThreeTupleInlineParam(
                        tuple
                    );

                return testEquality(result, tuple);
            }
        },
        {
            name: 'complexOneTupleReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexOneTupleReturnType();
                return testEquality(result, [['Hello', 0n]]);
            }
        },
        {
            name: 'complexOneTupleParam',
            test: async () => {
                const tuple: ComplexOneTuple = [['Goodbye', 1n]];
                const result =
                    await tupleTypesCanister.complexOneTupleParam(tuple);

                return testEquality(result, tuple);
            }
        },
        {
            name: 'complexOneTupleInlineReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexOneTupleInlineReturnType();

                return testEquality(result, [['Candy', 56n]]);
            }
        },
        {
            name: 'complexOneTupleInlineParam',
            test: async () => {
                const tuple: ComplexOneTuple = [['Mountain', 76n]];
                const result =
                    await tupleTypesCanister.complexOneTupleInlineParam(tuple);

                return testEquality(result, tuple);
            }
        },
        {
            name: 'complexTwoTupleReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexTwoTupleReturnType();
                const expected = [
                    ['Content-Type', 64n],
                    { id: '0', primitiveTwoTuple: ['Content-Type', 64n] }
                ];

                return testEquality(result, expected);
            }
        },
        {
            name: 'complexTwoTupleParam',
            test: async () => {
                const tuple: ComplexTwoTuple = [
                    ['Content-Length', 6_422n],
                    {
                        id: '1',
                        primitiveTwoTuple: ['Content-Type', 64n]
                    }
                ];
                const result =
                    await tupleTypesCanister.complexTwoTupleParam(tuple);

                return testEquality(result, tuple);
            }
        },
        {
            name: 'complexTwoTupleInlineReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexTwoTupleInlineReturnType();
                const expected = [
                    ['Content-Type', 644n],
                    { id: '444', primitiveTwoTuple: ['Content-Type', 6_422n] }
                ];

                return testEquality(result, expected);
            }
        },
        {
            name: 'complexTwoTupleInlineParam',
            test: async () => {
                const tuple: ComplexTwoTuple = [
                    ['Content-Length', 6_422n],
                    {
                        id: '1',
                        primitiveTwoTuple: ['Content-Type', 64n]
                    }
                ];
                const result =
                    await tupleTypesCanister.complexTwoTupleInlineParam([
                        ['Content-Length', 6_422n],
                        {
                            id: '133',
                            primitiveTwoTuple: ['Content-Type', 6_224n]
                        }
                    ]);

                return testEquality(result, tuple);
            }
        },
        {
            name: 'complexThreeTupleReturnType',
            test: async () => {
                const expected: ComplexThreeTuple = [
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
                ];
                const result =
                    await tupleTypesCanister.complexThreeTupleReturnType();

                return testEquality(result, expected);
            }
        },
        {
            name: 'complexThreeTupleParam',
            test: async () => {
                const tuple: ComplexThreeTuple = [
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
                ];
                const result =
                    await tupleTypesCanister.complexThreeTupleParam(tuple);

                return testEquality(result, tuple);
            }
        },
        {
            name: 'complexThreeTupleInlineReturnType',
            test: async () => {
                const result =
                    await tupleTypesCanister.complexThreeTupleInlineReturnType();

                const expected: ComplexThreeTuple = [
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
                ];

                return testEquality(result, expected);
            }
        },
        {
            name: 'complexThreeTupleInlineParam',
            test: async () => {
                const tuple: ComplexThreeTuple = [
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
                ];
                const result =
                    await tupleTypesCanister.complexThreeTupleInlineParam(
                        tuple
                    );

                return testEquality(result, tuple);
            }
        },
        {
            name: 'tupleArrayParamsAndReturnType',
            test: async () => {
                const tuple: Header[] = [
                    ['Content-Type', 'application/json'],
                    ['Accept-Ranges', 'bytes']
                ];
                const result =
                    await tupleTypesCanister.tupleArrayParamsAndReturnType(
                        tuple
                    );

                return testEquality(result, tuple);
            }
        },
        {
            name: 'tupleArrayRecordField',
            test: async () => {
                const result = await tupleTypesCanister.tupleArrayRecordField();
                const tuple = {
                    headers: [
                        ['Content-Type', 'application/json'],
                        ['Accept-Ranges', 'bytes']
                    ]
                };

                return testEquality(result, tuple);
            }
        },
        {
            name: 'tupleArrayVariantField',
            test: async () => {
                const result =
                    await tupleTypesCanister.tupleArrayVariantField();
                const expected: StreamingCallbackType = {
                    WithHeaders: [
                        ['Content-Type', 'application/json'],
                        ['Accept-Ranges', 'bytes']
                    ]
                };

                return testEquality(result, expected);
            }
        },
        {
            name: 'nested tuple test',
            test: async () => {
                const expected: [[string, [number, number]], bigint] = [
                    ['hello', [5, 10]],
                    123n
                ];
                const result =
                    await tupleTypesCanister.nestedTupleQuery(expected);

                return testEquality(result, expected);
            }
        }
    ];
}
