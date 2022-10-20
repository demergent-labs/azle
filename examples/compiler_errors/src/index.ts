import { Func, Opt, Query, Variant } from 'azle';
import { int } from 'azle';

type VariantNotProperties = Variant<{}>;
// export function qualified_name(param: azle.query.values.int): Query<void> {}

// Variant tests
// type VariantWithTooManyTypes = Variant<boolean, string, null, string[]>;
// export function bad_variant_one(param: VariantWithTooManyTypes): Query<void> {}
// type VariantWithWrongType = Variant<string>;
// export function bad_variant_two(param: VariantWithWrongType): Query<void> {}
// type VariantWithNotEnoughTypes = Variant;
// export function bad_variant_three(
//     param: VariantWithNotEnoughTypes
// ): Query<void> {}
// type VariantWithNoTypeAnnotation = Variant<{
//     whatTypeIsThis;
// }>;
// export function varNoType(variant: VariantWithNoTypeAnnotation): Query<void> {}
// type VariantWithMethod = Variant<{
//     thing(): Query<void>;
// }>;
// export function varMethod(variant: VariantWithMethod): Query<void> {}

// // Function tests
// type FuncWithTooManyTypes = Func<boolean, string, null, string[]>;
// export function bad_func_one(param: FuncWithTooManyTypes): Query<void> {}
// type FuncWithWrongType = Func<string>;
// export function bad_func_two(param: FuncWithWrongType): Query<void> {}
// type FuncWithNotEnoughTypes = Func;
// export function bad_func_three(param: FuncWithNotEnoughTypes): Query<void> {}
// type FuncWithMultipleFuncs = Func<() => void, () => void>;
// export function bad_func_four(param: FuncWithMultipleFuncs): Query<void> {}
// type FunctionWithoutFunc = () => Query<void>;
// export function bad_func_five(param: FunctionWithoutFunc): Query<void> {}
// type FuncWithoutQuery = Func<() => void>;
// export function bad_func_six(param: FuncWithoutQuery): Query<void> {}

// Option tests
// type OptionWithTooManyTypes = Opt<boolean, string, null, string[]>;
// export function bad_option_one(param: OptionWithTooManyTypes): Query<void> {}
// type OptWithNotEnoughTypes = Opt;
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

// export function object_function(my_object: object): Query<void> {}
// export function number_function(my_number: number): Query<void> {}
// export function bigint_function(my_bigint: bigint): Query<void> {}
// export function never_function(my_never: never): Query<void> {}
// export function symbol_function(my_symbol: symbol): Query<void> {}
// export function undefined_function(my_undefined: undefined): Query<void> {}
// export function unknown_function(my_unknown: unknown): Query<void> {}
// export function any_function(my_any: any): Query<void> {}
// type Uppercase<S extends string> = intrinsic;
// export function intrinsic_function(
//     my_intrinsic: Uppercase<string>
// ): Query<void> {}

// TODO test unsupported member types
// TsCallSignatureDecl
// TsConstructorSignatureDecl

// TODO test Canisters that have property signatures

// Record Tests
// type RecordWithNoTypeAnnotation = {
//     whatTypeIsThis;
// };
// export function recNoType(record: RecordWithNoTypeAnnotation): Query<void> {}
type RecordWithAny = {
    whatTypeIsThis: any;
};
export function recAny(record: RecordWithAny): Query<void> {}
// type RecordWithMethod = {
//     thing(): Query<void>;
// };
// export function recMethod(record: RecordWithMethod): Query<void> {}
// type RecordWithIndex = {
//     [index: string]: { message: string };
// };
// export function recIndex(record: RecordWithMethod): Query<void> {}
// type RecordWithSet = {
//     set thing_three(value: string);
// };
// export function recSet(record: RecordWithSet): Query<void> {}
// type RecordWithGet = {
//     get thing_two(): void;
// };
// export function recGet(record: RecordWithGet): Query<void> {}
