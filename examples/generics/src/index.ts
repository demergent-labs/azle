import {
    candid,
    float64,
    nat64,
    query,
    Record,
    Result,
    Service,
    Tuple,
    Variant,
    Vec
} from 'azle';
import { CandidClass, Parent } from '../../../src/lib_new/utils';

type SimpleResult = Result<string, number>;

type NonGenericResultAlias = Result<string, boolean>;

type GenericResultAlias<T, E> = Result<T, E>;

export class AzleGeneric {
    constructor(generic: any) {
        this._azleGeneric = generic;
    }

    _azleGeneric: any;

    getIDL(parents: Parent[]) {
        return;
    }
}

function Generic<generic extends CandidClass>(generic: generic) {
    return new AzleGeneric(generic);
}

class OneGenericTypeParamVariant<T> extends Variant {
    @candid(Generic())
    A: T;

    @candid(float64)
    B: number;
}

type TwoGenericTypeParamsVariant<T, U> = Variant<{
    A: T;
    B: U;
}>;

type ThreeGenericTypeParamsVariant<T, U, V> = Variant<{
    A: T;
    B: U;
    C: V;
}>;

type MyVariant<T> = Variant<{
    Arm1: T;
    Arm2: nat64;
}>;

type MyVariantAlias<T> = MyVariant<T>;

type KeyValuePair<K, V> = Variant<{
    Key: K;
    Value: V;
}>;

type GenericAliasVariant<T> = Variant<{
    Arm1: string;
    Arm2: KeyValuePair<T, nat64>;
}>;

type GenericAliasVariantAlias<T> = GenericAliasVariant<T>;

type GenericVariant<T, U, V> = Variant<{
    Arm1: T;
    Arm2: U;
    Arm3: V;
}>;

type OneGenericTypeParamRecord<T> = Record<{
    a: T;
    b: number;
}>;

type TwoGenericTypeParamsRecord<T, U> = Record<{
    a: T;
    b: U;
}>;

type ThreeGenericTypeParamsRecord<T, U, V> = Record<{
    a: T;
    b: U;
    c: V;
}>;

type MyRecord<T> = Record<{
    prop1: T;
    prop2: nat64;
}>;

type MyRecordAlias<T> = MyRecord<T>;

type KeyValuePairRecord<K, V> = Record<{
    key: K;
    value: V;
}>;

type GenericAliasRecord<T> = Record<{
    arm1: string;
    arm2: KeyValuePairRecord<T, nat64>;
}>;

type GenericAliasRecordAlias<T> = GenericAliasRecord<T>;

type GenericRecord<T, U, V> = Record<{
    arm1: T;
    arm2: U;
    arm3: V;
}>;

type OneGenericTypeParamTuple<T> = Tuple<[T, number]>;

type TwoGenericTypeParamsTuple<T, U> = Tuple<[T, U]>;

type ThreeGenericTypeParamsTuple<T, U, V> = Tuple<[T, U, V]>;

type MyTuple<T> = Tuple<[T, nat64]>;

type MyTupleAlias<T> = MyTuple<T>;

type KeyValuePairTuple<K, V> = Tuple<[K, V]>;

type GenericAliasTuple<T> = Tuple<[string, KeyValuePairTuple<T, nat64>]>;

type GenericAliasTupleAlias<T> = GenericAliasTuple<T>;

type OneGenericTypeParamVec<T> = Vec<T>;

type GenericTuple<T, U, V> = Tuple<[T, U, V]>;

type MyVec<T> = Vec<T>;

type MyVecAlias<T> = MyVec<T>;

type ThreeInlinesGenericVariant<T, K, V> = Variant<{
    Arm1: T;
    Arm2: K;
    Arm3: V;
}>;

export default class extends Service {
    @query([])
    simpleResult(): SimpleResult {
        return {
            Ok: 'A simple string'
        };
    }

    @query([])
    nonGenericResultAlias(): NonGenericResultAlias {
        return {
            Ok: 'Non-generic alias result'
        };
    }

    @query([])
    genericResultAlias(): GenericResultAlias<number, string> {
        return {
            Ok: 42
        };
    }

    @query([])
    resultInlineTypeArguments(): Result<boolean, Record<{ error: string }>> {
        return {
            Err: {
                error: 'An error with inline type arguments'
            }
        };
    }

    @query([])
    oneGenericTypeParamVariant(): OneGenericTypeParamVariant<string> {
        return { A: 'One generic type parameter' };
    }

    @query([])
    twoGenericTypeParamsVariant(): TwoGenericTypeParamsVariant<string, number> {
        return { B: 42 };
    }

    @query([])
    threeGenericTypeParamsVariant(): ThreeGenericTypeParamsVariant<
        string,
        number,
        boolean
    > {
        return { C: true };
    }

    @query([])
    myVariantAlias(): MyVariantAlias<string> {
        return { Arm1: 'Hello, world!' };
    }

    @query([])
    genericAliasVariantAlias(): GenericAliasVariantAlias<string> {
        return { Arm2: { Key: 'example' } };
    }

    @query([])
    inlineTypesGenericVariant(): GenericVariant<
        Record<{ id: number; name: string }>,
        Vec<boolean>,
        Tuple<[number, string]>
    > {
        return { Arm1: { id: 1, name: 'John Doe' } };
    }

    @query([])
    oneGenericTypeParamRecord(): OneGenericTypeParamRecord<string> {
        return { a: 'One generic type parameter', b: 456 };
    }

    @query([])
    twoGenericTypeParamsRecord(): TwoGenericTypeParamsRecord<string, number> {
        return { a: 'two generic type params record', b: 42 };
    }

    @query([])
    threeGenericTypeParamsRecord(): ThreeGenericTypeParamsRecord<
        string,
        number,
        boolean
    > {
        return { a: 'property a', b: 432, c: true };
    }

    @query([])
    myRecordAlias(): MyRecordAlias<string> {
        return { prop1: 'Hello, world!', prop2: 211n };
    }

    @query([])
    genericAliasRecordAlias(): GenericAliasRecordAlias<string> {
        return { arm1: 'Why yes', arm2: { key: 'example', value: 0n } };
    }

    @query([])
    inlineTypesGenericRecord(): GenericRecord<
        Record<{ id: number; name: string }>,
        Vec<boolean>,
        Tuple<[number, string]>
    > {
        return {
            arm1: { id: 1, name: 'John Doe' },
            arm2: [true, false, false],
            arm3: [665, 'oh yeah']
        };
    }

    @query([])
    oneGenericTypeParamTuple(): OneGenericTypeParamTuple<string> {
        return ['One generic type parameter', 456];
    }

    @query([])
    twoGenericTypeParamsTuple(): TwoGenericTypeParamsTuple<string, number> {
        return ['two generic type params tuple', 42];
    }

    @query([])
    threeGenericTypeParamsTuple(): ThreeGenericTypeParamsTuple<
        string,
        number,
        boolean
    > {
        return ['property a', 432, true];
    }

    @query([])
    myTupleAlias(): MyTupleAlias<string> {
        return ['Hello, world!', 211n];
    }

    @query([])
    genericAliasTupleAlias(): GenericAliasTupleAlias<string> {
        return ['Why yes', ['example', 0n]];
    }

    @query([])
    inlineTypesGenericTuple(): GenericTuple<
        Record<{ id: number; name: string }>,
        Vec<boolean>,
        Tuple<[number, string]>
    > {
        return [
            { id: 1, name: 'John Doe' },
            [true, false, false],
            [665, 'oh yeah']
        ];
    }

    @query([])
    oneGenericTypeParamVec(): OneGenericTypeParamVec<string> {
        return ['One generic type parameter', 'example 1'];
    }

    @query([])
    myVecAlias(): MyVecAlias<string> {
        return ['Hello, world!', 'example 4'];
    }

    @query([])
    inlineTypesGenericVec(): OneGenericTypeParamVec<
        Record<{
            id: number;
            name: string;
        }>
    > {
        return [{ id: 1, name: 'John Doe' }];
    }

    @query([])
    threeInlinesGenericVariant(): ThreeInlinesGenericVariant<
        Record<{ prop1: string; prop2: number; prop3: boolean }>,
        Variant<{ Arm1: string }>,
        Tuple<[string]>
    > {
        return {
            Arm3: ['It did work']
        };
    }
}
