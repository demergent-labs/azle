import { StableBTreeMap, text } from '../../src/lib/experimental';
import { AssertType, NotAnyAndExact } from '../assert_type';

// TODO we would need to test all of the types for StableBTreeMap
// TODO maybe we should just do it for the primitive types, and for opt and vec as well?

// TODO these tests just make sure that the basic methods are there
// TODO we want to maybe test that the type arguments work correctly as well

let _mapText = StableBTreeMap<text, text>(0);

export type TestContainsKey = AssertType<
    NotAnyAndExact<typeof _mapText.containsKey, (key: any) => boolean>
>;

export type TestGet = AssertType<
    NotAnyAndExact<typeof _mapText.get, (key: any) => any | null>
>;

export type TestInsert = AssertType<
    NotAnyAndExact<typeof _mapText.insert, (key: any, value: any) => any | null>
>;

export type TestIsEmpty = AssertType<
    NotAnyAndExact<typeof _mapText.isEmpty, () => boolean>
>;

export type TestItems = AssertType<
    NotAnyAndExact<typeof _mapText.items, () => [any, any][]>
>;

export type TestKeys = AssertType<
    NotAnyAndExact<typeof _mapText.keys, () => any[]>
>;

export type TestLen = AssertType<
    NotAnyAndExact<typeof _mapText.len, () => bigint>
>;

export type TestRemove = AssertType<
    NotAnyAndExact<typeof _mapText.remove, (key: any) => any | null>
>;

export type TestValues = AssertType<
    NotAnyAndExact<
        typeof _mapText.values,
        (startIndex?: number, length?: number) => any[]
    >
>;
