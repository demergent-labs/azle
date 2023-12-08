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
    Void,
    Record
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
] = ExampleTuple.tsType;

export const ExampleTupleInstance: typeof ExampleTuple.tsType = [
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

// Crude tests to ensure Tuple only accepts CandidType

const TupleRecord = Record({
    id: text,
    username: text
});

Tuple(float32);
Tuple(int16);
Tuple(TupleRecord);

// @ts-expect-error
Tuple({});

// @ts-expect-error
Tuple(5);

// @ts-expect-error
Tuple('not CandidType');

// @ts-expect-error
Tuple(null);

// @ts-expect-error
Tuple(undefined);

// @ts-expect-error
Tuple(Symbol('not CandidType'));
