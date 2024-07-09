import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { expect, it, Test } from 'azle/test';

import { _SERVICE } from '../dfx_generated/list_of_lists/list_of_lists.did';

export function getTests(listOfListsCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('listOfStringOne test', async () => {
            const expectedResult = ['hello', 'world'];
            const result =
                await listOfListsCanister.listOfStringOne(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfStringTwo test', async () => {
            const expectedResult = [
                ['hello', 'world'],
                ['hi', 'earth']
            ];
            const result =
                await listOfListsCanister.listOfStringTwo(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfStringFour test', async () => {
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

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfListOfInt8', async () => {
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

            expect(result).toStrictEqual(expectedResult);
        });

        // TODO we don't know we this just started breaking
        // https://github.com/demergent-labs/azle/issues/1453
        it('listOfNull test', async () => {
            const expectedResult = [
                [[null], [null]],
                [
                    [null, null, null],
                    [null, null, null]
                ]
            ];
            const result = await listOfListsCanister.listOfNull(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfBool test', async () => {
            const expectedResult = [[[false]]];
            const result = await listOfListsCanister.listOfBool(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfString test', async () => {
            const expectedResult = [[['hello']]];
            const result =
                await listOfListsCanister.listOfString(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfOptionString test', async () => {
            const expectedResult: ([] | [string])[][][] = [
                [[['hello'], []], [[], [], []], [['world']]]
            ];
            const result =
                await listOfListsCanister.listOfOptionString(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfEmpty test', async () => {
            await expect(listOfListsCanister.listOfEmpty()).rejects.toThrow(
                /Call failed/
            );
        });

        it('listOfReserved test', async () => {
            const expectedResult = [
                [[null], [null]],
                [
                    [null, null, null],
                    [null, null, null]
                ]
            ];
            const result = await listOfListsCanister.listOfReserved();

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfFunc test', async () => {
            const expectedResult: [Principal, string][][][] = [
                [
                    [
                        [Principal.fromText('aaaaa-aa'), 'createCanister'],
                        [Principal.fromText('aaaaa-aa'), 'installCode']
                    ]
                ]
            ];
            const result = await listOfListsCanister.listOfFunc(expectedResult);

            expect(result).toEqual(expectedResult);
        });

        it('listOfPrincipal test', async () => {
            const expectedResult = [[[Principal.fromText('aaaaa-aa')]]];
            const result =
                await listOfListsCanister.listOfPrincipal(expectedResult);

            expect(result[0][0][0].toText()).toStrictEqual(
                expectedResult[0][0][0].toText()
            );
        });

        it('listOfF64 test', async () => {
            const expectedResult = [[[1.234]]];
            const result = await listOfListsCanister.listOfF64(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfF32 test', async () => {
            const expectedResult = [[[1.234]]];
            const result = await listOfListsCanister.listOfF32(expectedResult);

            expect(Math.round(expectedResult[0][0][0])).toStrictEqual(
                Math.round(result[0][0][0])
            );
        });

        it('listOfInt test', async () => {
            const expectedResult = [
                [[1n], [2n]],
                [
                    [1n, 2n, 3n],
                    [4n, 5n, 6n]
                ]
            ];
            const result = await listOfListsCanister.listOfInt(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfInt64 test', async () => {
            const expectedResult = [[new BigInt64Array([1n])]];
            const result =
                await listOfListsCanister.listOfInt64(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfInt32 test', async () => {
            const expectedResult = [[new Int32Array([1])]];
            const result =
                await listOfListsCanister.listOfInt32(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfInt16 test', async () => {
            const expectedResult = [[new Int16Array([1])]];
            const result =
                await listOfListsCanister.listOfInt16(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfInt8 test', async () => {
            const expectedResult = [[new Int8Array([1])]];
            const result = await listOfListsCanister.listOfInt8(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfNat test', async () => {
            const expectedResult = [[[1n]]];
            const result = await listOfListsCanister.listOfNat(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfNat64 test', async () => {
            const expectedResult = [[new BigUint64Array([1n])]];
            const result =
                await listOfListsCanister.listOfNat64(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfNat32 test', async () => {
            const expectedResult = [[new Uint32Array([1])]];
            const result =
                await listOfListsCanister.listOfNat32(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfNat16 test', async () => {
            const expectedResult = [[new Uint16Array([1])]];
            const result =
                await listOfListsCanister.listOfNat16(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfNat8 test', async () => {
            const expectedResult = [[new Uint8Array([1])]];
            const result = await listOfListsCanister.listOfNat8(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfRecord test', async () => {
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

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfVariant test', async () => {
            const expectedResult = [
                [[{ solid: null }], [{ solid: null }]],
                [
                    [{ solid: null }, { liquid: null }, { gas: null }],
                    [{ liquid: null }, { gas: null }, { gas: null }]
                ]
            ];
            const result =
                await listOfListsCanister.listOfVariant(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfBlob test', async () => {
            const expectedResult = [new Uint8Array([104, 101, 108, 108, 111])];
            const result = await listOfListsCanister.listOfBlob(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });

        it('listOfListOfBlob test', async () => {
            const expectedResult = [
                [new Uint8Array([104, 101, 108, 108, 111])],
                [new Uint8Array([119, 111, 114, 108, 100])]
            ];
            const result =
                await listOfListsCanister.listOfListOfBlob(expectedResult);

            expect(result).toStrictEqual(expectedResult);
        });
    };
}
