// TODO there is much more we could test here

// empty is not present because its type is never which is difficult to test

import {
    bool,
    float32,
    float64,
    int,
    int8,
    int16,
    int32,
    int64,
    nat,
    nat8,
    nat16,
    nat32,
    nat64,
    Null,
    Record,
    reserved,
    text,
    Void
} from '../../../src/lib';
import { testCandidType, testSerializable } from '../../assert_type';

export const ExampleRecord = Record({
    bool: bool,
    float32: float32,
    float64: float64,
    int: int,
    int8: int8,
    int16: int16,
    int32: int32,
    int64: int64,
    nat: nat,
    nat8: nat8,
    nat16: nat16,
    nat32: nat32,
    nat64: nat64,
    null: Null,
    reserved: reserved,
    text: text,
    void: Void
});

testCandidType(ExampleRecord);
testSerializable(ExampleRecord);

export const TestExampleRecord: {
    bool: boolean;
    float32: number;
    float64: number;
    int: bigint;
    int8: number;
    int16: number;
    int32: number;
    int64: bigint;
    nat: bigint;
    nat8: number;
    nat16: number;
    nat32: number;
    nat64: bigint;
    null: null;
    reserved: any;
    text: string;
    void: void;
} = ExampleRecord.tsType;

export const ExampleRecordInstance: typeof ExampleRecord.tsType = {
    bool: true,
    float32: 0,
    float64: 0,
    int: 0n,
    int8: 0,
    int16: 0,
    int32: 0,
    int64: 0n,
    nat: 0n,
    nat8: 0,
    nat16: 0,
    nat32: 0,
    nat64: 0n,
    null: null,
    reserved: 'anything',
    text: '',
    void: undefined
};
