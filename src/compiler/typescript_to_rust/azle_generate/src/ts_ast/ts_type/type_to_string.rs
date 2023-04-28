use swc_ecma_ast::{TsFnOrConstructorType, TsType, TsUnionOrIntersectionType};

use crate::traits::TypeToString;

impl TypeToString for TsType {
    fn type_to_string(&self) -> String {
        match self {
            TsType::TsKeywordType(_) => "keyword",
            TsType::TsThisType(_) => "this",
            TsType::TsFnOrConstructorType(ts_fn_or_constructor_type) => {
                match ts_fn_or_constructor_type {
                    TsFnOrConstructorType::TsFnType(_) => "function",
                    TsFnOrConstructorType::TsConstructorType(_) => "constructor",
                }
            }
            TsType::TsTypeRef(_) => "type reference",
            TsType::TsTypeQuery(_) => "type query",
            TsType::TsTypeLit(_) => "type literal",
            TsType::TsArrayType(_) => "array",
            TsType::TsTupleType(_) => "tuple",
            TsType::TsOptionalType(_) => "optional",
            TsType::TsRestType(_) => "rest",
            TsType::TsUnionOrIntersectionType(ts_union_or_intersection_type) => {
                match ts_union_or_intersection_type {
                    TsUnionOrIntersectionType::TsUnionType(_) => "union",
                    TsUnionOrIntersectionType::TsIntersectionType(_) => "intersection",
                }
            }
            TsType::TsConditionalType(_) => "conditional",
            TsType::TsInferType(_) => "infer",
            TsType::TsParenthesizedType(_) => "parenthesized",
            TsType::TsTypeOperator(_) => "type operator",
            TsType::TsIndexedAccessType(_) => "indexed access",
            TsType::TsMappedType(_) => "mapped",
            TsType::TsLitType(_) => "literal",
            TsType::TsTypePredicate(_) => "type predicate",
            TsType::TsImportType(_) => "import",
        }
        .to_string()
    }
}
