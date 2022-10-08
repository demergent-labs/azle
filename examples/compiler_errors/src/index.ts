import { Func, Query, Variant } from 'azle';

type VariantWithTooManyTypes = Variant<boolean, string, null, string[]>;
type VariantWithWrongType = Variant<string>;
type VariantWithNotEnoughTypes = Variant;
// type BadVariant = Variant<string[]>;
// type BadFunc = Func<myFunction>;
// type BadVariant = Variant<{ thing: null }>;
// type BadFunc = Func<goodFunction>;
// type myFunction = boolean;
// type goodFunction = (param: string) => Query<boolean>;

// export function qualified_name(param: azle.query.values.int): Query<void> {}

export function bad_variant_one(param: VariantWithTooManyTypes): Query<void> {}
export function bad_variant_two(param: VariantWithWrongType): Query<void> {}
export function bad_variant_three(
    param: VariantWithNotEnoughTypes
): Query<void> {}
