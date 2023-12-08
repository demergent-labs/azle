import { Opt, StableBTreeMap, text } from '../../src/lib';
import { AssertType, NotAnyAndExact } from '../assert_type';

// TODO we would need to test all of the types for StableBTreeMap
// TODO maybe we should just do it for the primitive types, and for opt and vec as well?

// TODO these tests just make sure that the basic methods are there
// TODO we want to maybe test that the type arguments work correctly as well

let mapText = StableBTreeMap<text, text>(0);

export type TestContainsKey = AssertType<
    NotAnyAndExact<typeof mapText.containsKey, (key: any) => boolean>
>;

export type TestGet = AssertType<
    NotAnyAndExact<typeof mapText.get, (key: any) => Opt<any>>
>;

export type TestInsert = AssertType<
    NotAnyAndExact<typeof mapText.insert, (key: any, value: any) => Opt<any>>
>;

export type TestIsEmpty = AssertType<
    NotAnyAndExact<typeof mapText.isEmpty, () => boolean>
>;

export type TestItems = AssertType<
    NotAnyAndExact<typeof mapText.items, () => [any, any][]>
>;

export type TestKeys = AssertType<
    NotAnyAndExact<typeof mapText.keys, () => any[]>
>;

export type TestLen = AssertType<
    NotAnyAndExact<typeof mapText.len, () => bigint>
>;

export type TestRemove = AssertType<
    NotAnyAndExact<typeof mapText.remove, (key: any) => Opt<any>>
>;

export type TestValues = AssertType<
    NotAnyAndExact<
        typeof mapText.values,
        (startIndex?: number, length?: number) => any[]
    >
>;
