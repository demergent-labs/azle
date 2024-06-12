import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

import { _SERVICE } from './dfx_generated/generics/generics.did';

export function getTests(genericsCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('simpleResult', async () => {
            const result = await genericsCanister.simpleResult();

            expect('Ok' in result).toBe(true);
            expect(result.Ok).toBe('A simple string');
        });

        it('nonGenericResultAlias', async () => {
            const result = await genericsCanister.nonGenericResultAlias();

            expect('Ok' in result).toBe(true);
            expect(result.Ok).toBe('Non-generic alias result');
        });

        it('genericResultAlias', async () => {
            const result = await genericsCanister.genericResultAlias();

            expect('Ok' in result).toBe(true);
            expect(result.Ok).toBe(42);
        });

        it('resultInlineTypeArguments', async () => {
            const result = await genericsCanister.resultInlineTypeArguments();

            expect('Err' in result).toBe(true);
            expect(result.Err.error).toBe(
                'An error with inline type arguments'
            );
        });

        it('oneGenericTypeParamVariant', async () => {
            const result = await genericsCanister.oneGenericTypeParamVariant();

            expect('A' in result).toBe(true);
            expect(result.A).toBe('One generic type parameter');
        });

        it('twoGenericTypeParamsVariant', async () => {
            const result = await genericsCanister.twoGenericTypeParamsVariant();

            expect('B' in result).toBe(true);
            expect(result.B).toBe(42);
        });

        it('threeGenericTypeParamsVariant', async () => {
            const result =
                await genericsCanister.threeGenericTypeParamsVariant();

            expect('C' in result).toBe(true);
            expect(result.C).toBe(true);
        });

        it('myVariantAlias', async () => {
            const result = await genericsCanister.myVariantAlias();

            expect('Arm1' in result).toBe(true);
            expect(result.Arm1).toBe('Hello, world!');
        });

        it('genericAliasVariantAlias', async () => {
            const result = await genericsCanister.genericAliasVariantAlias();

            expect('Arm2' in result).toBe(true);
            expect('Key' in result.Arm2).toBe(true);
            expect(result.Arm2.Key).toBe('example');
        });

        it('inlineTypesGenericVariant', async () => {
            const result = await genericsCanister.inlineTypesGenericVariant();

            expect('Arm1' in result).toBe(true);
            expect(result.Arm1.id).toBe(1);
            expect(result.Arm1.name).toBe('John Doe');
        });

        it('oneGenericTypeParamRecord', async () => {
            const result = await genericsCanister.oneGenericTypeParamRecord();

            expect('a' in result).toBe(true);
            expect(result.a).toBe('One generic type parameter');
            expect('b' in result).toBe(true);
            expect(result.b).toBe(456);
        });

        it('twoGenericTypeParamsRecord', async () => {
            const result = await genericsCanister.twoGenericTypeParamsRecord();

            expect('a' in result).toBe(true);
            expect(result.a).toBe('two generic type params record');
            expect('b' in result).toBe(true);
            expect(result.b).toBe(42);
        });

        it('threeGenericTypeParamsRecord', async () => {
            const result =
                await genericsCanister.threeGenericTypeParamsRecord();

            expect('a' in result).toBe(true);
            expect(result.a).toBe('property a');
            expect('b' in result).toBe(true);
            expect(result.b).toBe(432);
            expect('c' in result).toBe(true);
            expect(result.c).toBe(true);
        });

        it('myRecordAlias', async () => {
            const result = await genericsCanister.myRecordAlias();

            expect('prop1' in result).toBe(true);
            expect(result.prop1).toBe('Hello, world!');
            expect('prop2' in result).toBe(true);
            expect(result.prop2).toBe(211n);
        });

        it('genericAliasRecordAlias', async () => {
            const result = await genericsCanister.genericAliasRecordAlias();

            expect('arm1' in result).toBe(true);
            expect(result.arm1).toBe('Why yes');
            expect('arm2' in result).toBe(true);
            expect('key' in result.arm2).toBe(true);
            expect(result.arm2.key).toBe('example');
            expect('value' in result.arm2).toBe(true);
            expect(result.arm2.value).toBe(0n);
        });

        it('inlineTypesGenericRecord', async () => {
            const result = await genericsCanister.inlineTypesGenericRecord();

            expect('arm1' in result).toBe(true);
            expect('id' in result.arm1).toBe(true);
            expect(result.arm1.id).toBe(1);
            expect('name' in result.arm1).toBe(true);
            expect(result.arm1.name).toBe('John Doe');
            expect('arm2' in result).toBe(true);
            expect(result.arm2[0]).toBe(true);
            expect(result.arm2[1]).toBe(false);
            expect(result.arm2[2]).toBe(false);
            expect('arm3' in result).toBe(true);
            expect(result.arm3[0]).toBe(665);
            expect(result.arm3[1]).toBe('oh yeah');
        });

        it('oneGenericTypeParamTuple', async () => {
            const result = await genericsCanister.oneGenericTypeParamTuple();

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBe('One generic type parameter');
            expect(result[1]).toBe(456);
        });

        it('twoGenericTypeParamsTuple', async () => {
            const result = await genericsCanister.twoGenericTypeParamsTuple();

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBe('two generic type params tuple');
            expect(result[1]).toBe(42);
        });

        it('threeGenericTypeParamsTuple', async () => {
            const result = await genericsCanister.threeGenericTypeParamsTuple();

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBe('property a');
            expect(result[1]).toBe(432);
            expect(result[2]).toBe(true);
        });

        it('myTupleAlias', async () => {
            const result = await genericsCanister.myTupleAlias();

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBe('Hello, world!');
            expect(result[1]).toBe(211n);
        });

        it('genericAliasTupleAlias', async () => {
            const result = await genericsCanister.genericAliasTupleAlias();

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBe('Why yes');
            expect(Array.isArray(result[1])).toBe(true);
            expect(result[1][0]).toBe('example');
            expect(result[1][1]).toBe(0n);
        });

        it('inlineTypesGenericTuple', async () => {
            const result = await genericsCanister.inlineTypesGenericTuple();

            expect(Array.isArray(result)).toBe(true);
            expect(typeof result[0]).toBe('object');
            expect(result[0].id).toBe(1);
            expect(result[0].name).toBe('John Doe');
            expect(Array.isArray(result[1])).toBe(true);
            expect(result[1][0]).toBe(true);
            expect(result[1][1]).toBe(false);
            expect(result[1][2]).toBe(false);
            expect(Array.isArray(result[2])).toBe(true);
            expect(result[2][0]).toBe(665);
            expect(result[2][1]).toBe('oh yeah');
        });

        it('oneGenericTypeParamVec', async () => {
            const result = await genericsCanister.oneGenericTypeParamVec();

            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(2);
            expect(result[0]).toBe('One generic type parameter');
            expect(result[1]).toBe('example 1');
        });

        it('myVecAlias', async () => {
            const result = await genericsCanister.myVecAlias();

            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(2);
            expect(result[0]).toBe('Hello, world!');
            expect(result[1]).toBe('example 4');
        });

        it('inlineTypesGenericVec', async () => {
            const result = await genericsCanister.inlineTypesGenericVec();

            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(1);
            expect(result[0].id).toBe(1);
            expect(result[0].name).toBe('John Doe');
        });

        it('threeInlinesGenericVariant', async () => {
            const result = await genericsCanister.threeInlinesGenericVariant();

            expect('Arm3' in result).toBe(true);
            expect(Array.isArray(result.Arm3)).toBe(true);
            expect(result.Arm3[0]).toBe('It did work');
        });
    };
}
