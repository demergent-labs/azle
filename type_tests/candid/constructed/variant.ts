// TODO there is much more we could test here

// empty is not present because its type is never which is difficult to test

import {
    float32,
    float64,
    int8,
    int16,
    int32,
    nat,
    nat8,
    nat16,
    nat64,
    Null,
    reserved,
    text,
    Variant,
    RequireExactlyOne
} from '../../../src/lib';
import { testCandidType, testSerializable } from '../../assert_type';

export const ExampleVariant = Variant({
    bool: Null,
    float32: float32,
    float64: float64,
    int: Null,
    int8: int8,
    int16: int16,
    int32: int32,
    int64: Null,
    nat: nat,
    nat8: nat8,
    nat16: nat16,
    nat32: Null,
    nat64: nat64,
    null: Null,
    reserved: reserved,
    text: text,
    void: Null
});

testCandidType(ExampleVariant);
testSerializable(ExampleVariant);

export const TestExampleVariant: RequireExactlyOne<{
    bool: null;
    float32: number;
    float64: number;
    int: null;
    int8: number;
    int16: number;
    int32: number;
    int64: null;
    nat: bigint;
    nat8: number;
    nat16: number;
    nat32: null;
    nat64: bigint;
    null: null;
    reserved: any;
    text: string;
    void: null;
}> = ExampleVariant.tsType;

export const ExampleVariantInstance0: typeof ExampleVariant.tsType = {
    bool: null
};

export const ExampleVariantInstance1: typeof ExampleVariant.tsType = {
    float32: 0
};

export const ExampleVariantInstance2: typeof ExampleVariant.tsType = {
    float64: 0
};

export const ExampleVariantInstance3: typeof ExampleVariant.tsType = {
    int: null
};
