import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/tuple_types/tuple_types.did';

type PrimitiveOneTuple = [string];
type PrimitiveTwoTuple = [string, bigint];
type PrimitiveThreeTuple = [string, bigint, Principal];

type User = {
    id: string;
    primitiveTwoTuple: PrimitiveTwoTuple;
};

type Header = [string, string];

type Reaction = { Good: null } | { Bad: ComplexThreeTuple };

type ComplexOneTuple = [PrimitiveTwoTuple];
type ComplexTwoTuple = [PrimitiveTwoTuple, User];
type ComplexThreeTuple = [PrimitiveTwoTuple, User, Reaction];

export function getTests(tupleTypesCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('primitiveOneTupleReturnType', async () => {
            const result =
                await tupleTypesCanister.primitiveOneTupleReturnType();
            const expectedResult = ['Hello'];

            expect(result).toEqual(expectedResult);
        });

        it('primitiveOneTupleParam', async () => {
            const tuple: PrimitiveOneTuple = ['Yes'];
            const result =
                await tupleTypesCanister.primitiveOneTupleParam(tuple);

            expect(result).toEqual(tuple);
        });

        it('primitiveOneTupleInlineReturnType', async () => {
            const result =
                await tupleTypesCanister.primitiveOneTupleInlineReturnType();
            const expectedResult = ['Greenland'];

            expect(result).toEqual(expectedResult);
        });

        it('primitiveOneTupleInlineParam', async () => {
            const tuple: PrimitiveOneTuple = ['Rocks'];
            const result =
                await tupleTypesCanister.primitiveOneTupleInlineParam(tuple);

            expect(result).toEqual(tuple);
        });

        it('primitiveTwoTupleReturnType', async () => {
            const result =
                await tupleTypesCanister.primitiveTwoTupleReturnType();
            const expectedResult = ['Content-Type', 64n];

            expect(result).toEqual(expectedResult);
        });

        it('primitiveTwoTupleParam', async () => {
            const tuple: PrimitiveTwoTuple = ['Folly', 6433n];
            const result =
                await tupleTypesCanister.primitiveTwoTupleParam(tuple);

            expect(result).toEqual(tuple);
        });

        it('primitiveTwoTupleInlineReturnType', async () => {
            const result =
                await tupleTypesCanister.primitiveTwoTupleInlineReturnType();
            const expectedResult = ['Fun', 'Times'];

            expect(result).toEqual(expectedResult);
        });

        it('primitiveTwoTupleInlineParam', async () => {
            const tuple: [string, string] = ['Great', 'Days'];
            const result =
                await tupleTypesCanister.primitiveTwoTupleInlineParam(tuple);

            expect(result).toEqual(tuple);
        });

        it('primitiveThreeTupleReturnType', async () => {
            const result =
                await tupleTypesCanister.primitiveThreeTupleReturnType();
            const expectedResult = [
                'Good',
                454n,
                Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
            ];

            expect(result).toEqual(expectedResult);
        });

        it('primitiveThreeTupleParam', async () => {
            const tuple: PrimitiveThreeTuple = [
                'Antarctica',
                41_415n,
                Principal.fromText('aaaaa-aa')
            ];
            const result =
                await tupleTypesCanister.primitiveThreeTupleParam(tuple);

            expect(result).toEqual(tuple);
        });

        it('primitiveThreeTupleInlineReturnType', async () => {
            const result =
                await tupleTypesCanister.primitiveThreeTupleInlineReturnType();
            const expectedResult = [
                'Fun',
                101n,
                Principal.fromText('aaaaa-aa')
            ];

            expect(result).toEqual(expectedResult);
        });

        it('primitiveThreeTupleInlineParam', async () => {
            const tuple: PrimitiveThreeTuple = [
                'Great',
                300n,
                Principal.fromText('aaaaa-aa')
            ];
            const result =
                await tupleTypesCanister.primitiveThreeTupleInlineParam(tuple);

            expect(result).toEqual(tuple);
        });

        it('complexOneTupleReturnType', async () => {
            const result = await tupleTypesCanister.complexOneTupleReturnType();
            const expectedResult = [['Hello', 0n]];

            expect(result).toEqual(expectedResult);
        });

        it('complexOneTupleParam', async () => {
            const tuple: ComplexOneTuple = [['Goodbye', 1n]];
            const result = await tupleTypesCanister.complexOneTupleParam(tuple);

            expect(result).toEqual(tuple);
        });

        it('complexOneTupleInlineReturnType', async () => {
            const result =
                await tupleTypesCanister.complexOneTupleInlineReturnType();
            const expectedResult = [['Candy', 56n]];

            expect(result).toEqual(expectedResult);
        });

        it('complexOneTupleInlineParam', async () => {
            const tuple: ComplexOneTuple = [['Mountain', 76n]];
            const result =
                await tupleTypesCanister.complexOneTupleInlineParam(tuple);

            expect(result).toEqual(tuple);
        });

        it('complexTwoTupleReturnType', async () => {
            const result = await tupleTypesCanister.complexTwoTupleReturnType();
            const expectedResult = [
                ['Content-Type', 64n],
                { id: '0', primitiveTwoTuple: ['Content-Type', 64n] }
            ];

            expect(result).toEqual(expectedResult);
        });

        it('complexTwoTupleParam', async () => {
            const tuple: ComplexTwoTuple = [
                ['Content-Length', 6422n],
                { id: '1', primitiveTwoTuple: ['Content-Type', 64n] }
            ];
            const result = await tupleTypesCanister.complexTwoTupleParam(tuple);

            expect(result).toEqual(tuple);
        });

        it('complexTwoTupleInlineReturnType', async () => {
            const result =
                await tupleTypesCanister.complexTwoTupleInlineReturnType();
            const expectedResult = [
                ['Content-Type', 644n],
                { id: '444', primitiveTwoTuple: ['Content-Type', 6422n] }
            ];

            expect(result).toEqual(expectedResult);
        });

        it('complexTwoTupleInlineParam', async () => {
            const tuple: ComplexTwoTuple = [
                ['Content-Length', 6422n],
                { id: '133', primitiveTwoTuple: ['Content-Type', 6224n] }
            ];
            const result =
                await tupleTypesCanister.complexTwoTupleInlineParam(tuple);

            expect(result).toEqual(tuple);
        });

        it('complexThreeTupleReturnType', async () => {
            const result =
                await tupleTypesCanister.complexThreeTupleReturnType();
            const expectedResult = [
                ['Content-Type', 64n],
                { id: '0', primitiveTwoTuple: ['Content-Type', 64n] },
                {
                    Bad: [
                        ['Content-Type', 64n],
                        { id: '1', primitiveTwoTuple: ['Content-Type', 64n] },
                        { Good: null }
                    ]
                }
            ];

            expect(result).toEqual(expectedResult);
        });

        it('complexThreeTupleParam', async () => {
            const tuple: ComplexThreeTuple = [
                ['Content-Type', 64n],
                { id: '0', primitiveTwoTuple: ['Content-Type', 64n] },
                {
                    Bad: [
                        ['Content-Type', 64n],
                        { id: '1', primitiveTwoTuple: ['Content-Type', 64n] },
                        { Good: null }
                    ]
                }
            ];
            const result =
                await tupleTypesCanister.complexThreeTupleParam(tuple);

            expect(result).toEqual(tuple);
        });

        it('complexThreeTupleInlineReturnType', async () => {
            const result =
                await tupleTypesCanister.complexThreeTupleInlineReturnType();
            const expectedResult = [
                ['Content-Type', 64n],
                { id: '0', primitiveTwoTuple: ['Content-Type', 64n] },
                {
                    Bad: [
                        ['Content-Type', 64n],
                        { id: '1', primitiveTwoTuple: ['Content-Type', 64n] },
                        { Good: null }
                    ]
                }
            ];

            expect(result).toEqual(expectedResult);
        });

        it('complexThreeTupleInlineParam', async () => {
            const tuple: ComplexThreeTuple = [
                ['Content-Type', 64n],
                { id: '0', primitiveTwoTuple: ['Content-Type', 64n] },
                {
                    Bad: [
                        ['Content-Type', 64n],
                        { id: '1', primitiveTwoTuple: ['Content-Type', 64n] },
                        { Good: null }
                    ]
                }
            ];
            const result =
                await tupleTypesCanister.complexThreeTupleInlineParam(tuple);

            expect(result).toEqual(tuple);
        });

        it('tupleArrayParamsAndReturnType', async () => {
            const tuple: Header[] = [
                ['Content-Type', 'application/json'],
                ['Accept-Ranges', 'bytes']
            ];
            const result =
                await tupleTypesCanister.tupleArrayParamsAndReturnType(tuple);

            expect(result).toEqual(tuple);
        });

        it('tupleArrayRecordField', async () => {
            const result = await tupleTypesCanister.tupleArrayRecordField();
            const expectedResult = {
                headers: [
                    ['Content-Type', 'application/json'],
                    ['Accept-Ranges', 'bytes']
                ]
            };

            expect(result).toEqual(expectedResult);
        });

        it('tupleArrayVariantField', async () => {
            const result = await tupleTypesCanister.tupleArrayVariantField();
            const expectedResult = {
                WithHeaders: [
                    ['Content-Type', 'application/json'],
                    ['Accept-Ranges', 'bytes']
                ]
            };

            expect(result).toEqual(expectedResult);
        });

        it('nested tuple test', async () => {
            const tuple: [[string, [number, number]], bigint] = [
                ['hello', [5, 10]],
                123n
            ];
            const result = await tupleTypesCanister.nestedTupleQuery(tuple);

            expect(result).toEqual(tuple);
        });
    };
}
