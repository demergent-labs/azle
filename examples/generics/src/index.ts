import { Alias, nat64, $query, Record, Result, Variant } from 'azle';

// TODO let's do the same for records

type SimpleResult = Alias<Result<string, number>>;

$query;
export function simpleResult(): SimpleResult {
    return {
        Ok: 'A simple string'
    };
}

type NonGenericResultAlias = Alias<Result<string, boolean>>;

$query;
export function nonGenericResultAlias(): NonGenericResultAlias {
    return {
        Ok: 'Non-generic alias result'
    };
}

type GenericResultAlias<T, E> = Alias<Result<T, E>>;

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

type MyVariantAlias<T> = Alias<MyVariant<T>>;

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

type GenericAliasVariantAlias<T> = Alias<GenericAliasVariant<T>>;

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
    boolean[],
    [number, string]
> {
    return { Arm1: { id: 1, name: 'John Doe' } };
}
