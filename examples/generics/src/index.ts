import { nat64, $query, Record, Result, Tuple, Variant, Vec } from 'azle';

type SimpleResult = Result<string, number>;

$query;
export function simpleResult(): SimpleResult {
    return {
        Ok: 'A simple string'
    };
}

type NonGenericResultAlias = Result<string, boolean>;

$query;
export function nonGenericResultAlias(): NonGenericResultAlias {
    return {
        Ok: 'Non-generic alias result'
    };
}

type GenericResultAlias<T, E> = Result<T, E>;

$query;
export function genericResultAlias(): GenericResultAlias<number, string> {
    return {
        Ok: 42
    };
}

$query;
export function resultInlineTypeArguments(): Result<
    boolean,
    Record<{ error: string }>
> {
    return {
        Err: {
            error: 'An error with inline type arguments'
        }
    };
}

type OneGenericTypeParamVariant<T> = Variant<{
    A: T;
    B: number;
}>;

$query;
export function oneGenericTypeParamVariant(): OneGenericTypeParamVariant<string> {
    return { A: 'One generic type parameter' };
}

type TwoGenericTypeParamsVariant<T, U> = Variant<{
    A: T;
    B: U;
}>;

$query;
export function twoGenericTypeParamsVariant(): TwoGenericTypeParamsVariant<
    string,
    number
> {
    return { B: 42 };
}

type ThreeGenericTypeParamsVariant<T, U, V> = Variant<{
    A: T;
    B: U;
    C: V;
}>;

$query;
export function threeGenericTypeParamsVariant(): ThreeGenericTypeParamsVariant<
    string,
    number,
    boolean
> {
    return { C: true };
}

type MyVariant<T> = Variant<{
    Arm1: T;
    Arm2: nat64;
}>;

type MyVariantAlias<T> = MyVariant<T>;

$query;
export function myVariantAlias(): MyVariantAlias<string> {
    return { Arm1: 'Hello, world!' };
}

type KeyValuePair<K, V> = Variant<{
    Key: K;
    Value: V;
}>;

type GenericAliasVariant<T> = Variant<{
    Arm1: string;
    Arm2: KeyValuePair<T, nat64>;
}>;

type GenericAliasVariantAlias<T> = GenericAliasVariant<T>;

$query;
export function genericAliasVariantAlias(): GenericAliasVariantAlias<string> {
    return { Arm2: { Key: 'example' } };
}

type GenericVariant<T, U, V> = Variant<{
    Arm1: T;
    Arm2: U;
    Arm3: V;
}>;

$query;
export function inlineTypesGenericVariant(): GenericVariant<
    Record<{ id: number; name: string }>,
    Vec<boolean>,
    Tuple<[number, string]>
> {
    return { Arm1: { id: 1, name: 'John Doe' } };
}

type OneGenericTypeParamRecord<T> = Record<{
    a: T;
    b: number;
}>;

$query;
export function oneGenericTypeParamRecord(): OneGenericTypeParamRecord<string> {
    return { a: 'One generic type parameter', b: 456 };
}

type TwoGenericTypeParamsRecord<T, U> = Record<{
    a: T;
    b: U;
}>;

$query;
export function twoGenericTypeParamsRecord(): TwoGenericTypeParamsRecord<
    string,
    number
> {
    return { a: 'two generic type params record', b: 42 };
}

type ThreeGenericTypeParamsRecord<T, U, V> = Record<{
    a: T;
    b: U;
    c: V;
}>;

$query;
export function threeGenericTypeParamsRecord(): ThreeGenericTypeParamsRecord<
    string,
    number,
    boolean
> {
    return { a: 'property a', b: 432, c: true };
}

type MyRecord<T> = Record<{
    prop1: T;
    prop2: nat64;
}>;

type MyRecordAlias<T> = MyRecord<T>;

$query;
export function myRecordAlias(): MyRecordAlias<string> {
    return { prop1: 'Hello, world!', prop2: 211n };
}

type KeyValuePairRecord<K, V> = Record<{
    key: K;
    value: V;
}>;

type GenericAliasRecord<T> = Record<{
    arm1: string;
    arm2: KeyValuePairRecord<T, nat64>;
}>;

type GenericAliasRecordAlias<T> = GenericAliasRecord<T>;

$query;
export function genericAliasRecordAlias(): GenericAliasRecordAlias<string> {
    return { arm1: 'Why yes', arm2: { key: 'example', value: 0n } };
}

type GenericRecord<T, U, V> = Record<{
    arm1: T;
    arm2: U;
    arm3: V;
}>;

$query;
export function inlineTypesGenericRecord(): GenericRecord<
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

type OneGenericTypeParamTuple<T> = Tuple<[T, number]>;

$query;
export function oneGenericTypeParamTuple(): OneGenericTypeParamTuple<string> {
    return ['One generic type parameter', 456];
}

type TwoGenericTypeParamsTuple<T, U> = Tuple<[T, U]>;

$query;
export function twoGenericTypeParamsTuple(): TwoGenericTypeParamsTuple<
    string,
    number
> {
    return ['two generic type params tuple', 42];
}

type ThreeGenericTypeParamsTuple<T, U, V> = Tuple<[T, U, V]>;

$query;
export function threeGenericTypeParamsTuple(): ThreeGenericTypeParamsTuple<
    string,
    number,
    boolean
> {
    return ['property a', 432, true];
}

type MyTuple<T> = Tuple<[T, nat64]>;

type MyTupleAlias<T> = MyTuple<T>;

$query;
export function myTupleAlias(): MyTupleAlias<string> {
    return ['Hello, world!', 211n];
}

type KeyValuePairTuple<K, V> = Tuple<[K, V]>;

type GenericAliasTuple<T> = Tuple<[string, KeyValuePairTuple<T, nat64>]>;

type GenericAliasTupleAlias<T> = GenericAliasTuple<T>;

$query;
export function genericAliasTupleAlias(): GenericAliasTupleAlias<string> {
    return ['Why yes', ['example', 0n]];
}

type GenericTuple<T, U, V> = Tuple<[T, U, V]>;

$query;
export function inlineTypesGenericTuple(): GenericTuple<
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

type OneGenericTypeParamVec<T> = Vec<T>;

$query;
export function oneGenericTypeParamVec(): OneGenericTypeParamVec<string> {
    return ['One generic type parameter', 'example 1'];
}

type MyVec<T> = Vec<T>;

type MyVecAlias<T> = MyVec<T>;

$query;
export function myVecAlias(): MyVecAlias<string> {
    return ['Hello, world!', 'example 4'];
}

$query;
export function inlineTypesGenericVec(): OneGenericTypeParamVec<
    Record<{
        id: number;
        name: string;
    }>
> {
    return [{ id: 1, name: 'John Doe' }];
}

type ThreeInlinesGenericVariant<T, K, V> = Variant<{
    Arm1: T;
    Arm2: K;
    Arm3: V;
}>;

$query;
export function threeInlinesGenericVariant(): ThreeInlinesGenericVariant<
    Record<{ prop1: string; prop2: number; prop3: boolean }>,
    Variant<{ Arm1: string }>,
    Tuple<[string]>
> {
    return {
        Arm3: ['It did work']
    };
}
