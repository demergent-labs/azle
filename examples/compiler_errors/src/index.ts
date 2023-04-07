import { empty, Func, Opt, Query, Record, Update, Variant, Vec } from 'azle';
import { int } from 'azle';

type User = Record<{
    id: string;
}>;
type VariantNotProperties = Variant<{}>;
// export function qualified_name(param: azle.query.values.int): Query<void> {}

// Variant tests
// type VariantWithTooManyTypes = Variant<boolean, string, null, Vec<string>>;
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
// type FuncWithTooManyTypes = Func<boolean, string, null, Vec<string>>;
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
// type OptionWithTooManyTypes = Opt<boolean, string, null, Vec<string>>;
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
// TsConditionalType
// TsInferType
// TsParenthesizedType
// TsTypeOperator
// TsIndexedAccessType
// TsMappedType
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
// type RecordWithAny = {
//     whatTypeIsThis: any;
// };
// export function recAny(record: RecordWithAny): Query<void> {}
// type RecordWithQualifiedName = {
//     whatTypeIsThis: azle.int;
// };
// export function recQualified(record: RecordWithQualifiedName): Query<void> {}
// type RecordWithUnion = {
//     whatTypeIsThis: int | string;
// };
// export function recUnion(record: RecordWithUnion): Query<void> {}
// type RecordWithLitType = {
//     whatTypeIsThis: 'string';
// };
// export function recLitType(record: RecordWithLitType): Query<void> {}
// type RecordWithIntersection = {
//     whatTypeIsThis: int & string;
// };
// export function recIntersection(record: RecordWithIntersection): Query<void> {}
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

// #region FnDecl Errors

// export function array_destructure(
//     [firstUser]: Vec<User>,
//     user: User
// ): Query<empty> {
//     throw "This function uses array destructuring, which isn't currently supported";
// }

// export function missing_return_type(): Update {
//     throw 'This method is missing a return type inside `Query`';
// }

// export function object_destructure({ name }: User): Query<empty> {
//     throw "This function uses object destructuring, which isn't currently supported";
// }

// export function assignment_pattern(
//     first: User,
//     thing: String = 'default',
//     third: User
// ): Query<empty> {
//     throw "This function uses an assignment pattern, which isn't currently supported";
// }

// export function assignment_pattern_with_assignment_on_new_line(
//     first: User,
//     thing: String
//         = 'default',
//     third: User
// ): Query<empty> {
//     throw "This function uses an assignment pattern, which isn't currently supported";
// }

// export function rest_param(first: User, ...rest: any[]): Query<empty> {
//     throw "This function uses a rest parameter, which can't be represented in candid";
// }

// export function using_namespace_qualified_return_type_inside_query(): Query<Azle.empty> {
//     throw 'This function namespace qualifies the return type inside of Query';
// }

// export function untyped_param(thing): Query<empty> {
//     throw "This function's parameter does not have a type specified";
// }

// #endregion FnDecl Errors
