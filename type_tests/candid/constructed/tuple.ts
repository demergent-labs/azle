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
    reserved,
    text,
    Tuple,
    Void
} from '../../../src/lib';
import { testCandidType, testSerializable } from '../../assert_type';

export const ExampleTuple = Tuple(
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
    reserved,
    text,
    Void
);

testCandidType(ExampleTuple);
testSerializable(ExampleTuple);

export const TestExampleTuple: [
    boolean,
    number,
    number,
    bigint,
    number,
    number,
    number,
    bigint,
    bigint,
    number,
    number,
    number,
    bigint,
    null,
    any,
    string,
    void
] = ExampleTuple;

export const ExampleTupleInstance: typeof ExampleTuple = [
    true,
    0,
    0,
    0n,
    0,
    0,
    0,
    0n,
    0n,
    0,
    0,
    0,
    0n,
    null,
    'anything',
    '',
    undefined
];
