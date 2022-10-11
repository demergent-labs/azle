import { Func, Query, Variant } from 'azle';

type VariantNotProperties = Variant<{}>;
// export function qualified_name(param: azle.query.values.int): Query<void> {}

// Variant tests
// type VariantWithTooManyTypes = Variant<boolean, string, null, string[]>;
type VariantWithWrongType = Variant<string>;
// type VariantWithNotEnoughTypes = Variant;
// export function bad_variant_one(param: VariantWithTooManyTypes): Query<void> {}
export function bad_variant_two(param: VariantWithWrongType): Query<void> {}
// export function bad_variant_three(
//     param: VariantWithNotEnoughTypes
// ): Query<void> {}

// type TypeLit = {
//     thing(): {};
//     get thing_two(): void;
//     set thing_three(value: string);
// };

// // Function tests
// type FuncWithTooManyTypes = Func<boolean, string, null, string[]>;
// type FuncWithWrongType = Func<string>;
// type FuncWithNotEnoughTypes = Func;
// type FuncWithMultipleFuncs = Func<() => void, () => void>;
// export function bad_func_one(param: FuncWithTooManyTypes): Query<void> {}
// export function bad_func_two(param: FuncWithWrongType): Query<void> {}
// export function bad_func_three(param: FuncWithNotEnoughTypes): Query<void> {}
// export function bad_func_four(param: FuncWithNotEnoughTypes): Query<void> {}

// I don't remember what these are testing
// type BadFunc = Func<myFunction>;
// type BadVariant = Variant<{ thing: null }>;
// type BadFunc = Func<goodFunction>;
// type myFunction = boolean;
// type goodFunction = (param: string) => Query<boolean>;
