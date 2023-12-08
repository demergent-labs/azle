// TODO These tests are just for one type, float32
// TODO it will take a lot of effort (not that much though) to get all types tested with Vec

import {
    float32,
    int16,
    Opt,
    Record,
    RequireExactlyOne,
    text
} from '../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';
import { TypeMapping } from '../../../src/lib/candid/type_mapping';

testCandidType(Opt(float32));
testSerializable(Opt(float32));

const testTypeMapping = Opt(float32);
export type TestTypeMapping = AssertType<
    NotAnyAndExact<
        TypeMapping<typeof testTypeMapping>,
        RequireExactlyOne<{ Some: number; None: null }>
    >
>;

testCandidType(Opt(Opt(float32)));
testSerializable(Opt(Opt(float32)));

const testTypeMappingDouble = Opt(Opt(float32));
export type TestTypeMappingDouble = AssertType<
    NotAnyAndExact<
        TypeMapping<typeof testTypeMappingDouble>,
        RequireExactlyOne<{
            Some: RequireExactlyOne<{ Some: number; None: null }>;
            None: null;
        }>
    >
>;

testCandidType(Opt(Opt(Opt(float32))));
testSerializable(Opt(Opt(Opt(float32))));

const testTypeMappingTriple = Opt(Opt(Opt(float32)));
export type TestTypeMappingTriple = AssertType<
    NotAnyAndExact<
        TypeMapping<typeof testTypeMappingTriple>,
        RequireExactlyOne<{
            Some: RequireExactlyOne<{
                Some: RequireExactlyOne<{ Some: number; None: null }>;
                None: null;
            }>;
            None: null;
        }>
    >
>;

// Crude tests to ensure Opt only accepts CandidType

const OptRecord = Record({
    id: text,
    username: text
});

Opt(float32);
Opt(int16);
Opt(OptRecord);

// @ts-expect-error
Opt({});

// @ts-expect-error
Opt(5);

// @ts-expect-error
Opt('not CandidType');

// @ts-expect-error
Opt(null);

// @ts-expect-error
Opt(undefined);

// @ts-expect-error
Opt(Symbol('not CandidType'));
