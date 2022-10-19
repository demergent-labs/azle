import { Func, Opt, Query, Variant } from 'azle';

type VariantNotProperties = Variant<{}>;
// export function qualified_name(param: azle.query.values.int): Query<void> {}

// Variant tests
// type VariantWithTooManyTypes = Variant<boolean, string, null, string[]>;
// type VariantWithWrongType = Variant<string>;
// type VariantWithNotEnoughTypes = Variant;
// export function bad_variant_one(param: VariantWithTooManyTypes): Query<void> {}
// export function bad_variant_two(param: VariantWithWrongType): Query<void> {}
// export function bad_variant_three(
//     param: VariantWithNotEnoughTypes
// ): Query<void> {}

// // Function tests
// type FuncWithTooManyTypes = Func<boolean, string, null, string[]>;
// type FuncWithWrongType = Func<string>;
// type FuncWithNotEnoughTypes = Func;
// type FuncWithMultipleFuncs = Func<() => void, () => void>;
type FunctionWithoutFunc = () => Query<void>;
// type FuncWithoutQuery = Func<() => void>;
// export function bad_func_one(param: FuncWithTooManyTypes): Query<void> {}
// export function bad_func_two(param: FuncWithWrongType): Query<void> {}
// export function bad_func_three(param: FuncWithNotEnoughTypes): Query<void> {}
// export function bad_func_four(param: FuncWithMultipleFuncs): Query<void> {}
export function bad_func_five(param: FunctionWithoutFunc): Query<void> {}
// export function bad_func_six(param: FuncWithoutQuery): Query<void> {}

// Option tests
// type OptionWithTooManyTypes = Opt<boolean, string, null, string[]>;
// type OptWithNotEnoughTypes = Opt;
// export function bad_option_one(param: OptionWithTooManyTypes): Query<void> {}
// export function bad_option_three(param: OptWithNotEnoughTypes): Query<void> {}

// I don't remember what these are testing
// type BadFunc = Func<myFunction>;
// type BadVariant = Variant<{ thing: null }>;
// type BadFunc = Func<goodFunction>;
// type myFunction = boolean;
// type goodFunction = (param: string) => Query<boolean>;

// TODO test unsupported types
// TsConstructorType
// TsThisType
// TsTypeQuery
// TsOptionalType
// TsRestType
// TsUnionOrIntersectionType
// TsConditionalType
// TsInferType
// TsParenthesizedType
// TsTypeOperator
// TsIndexedAccessType
// TsMappedType
// TsLitType
// TsTypePredicate
// TsImportType
