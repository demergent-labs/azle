use swc_common::{SourceMap, Span};
use swc_ecma_ast::{TsFnOrConstructorType, TsType, TsUnionOrIntersectionType};

use crate::{
    errors::ErrorMessage,
    traits::{GetSourceFileInfo, GetSpan, TypeToString},
};

// TODO we probably should specify that they can use these types in their code
// wherever just so long as they aren't in any or their exported types or
// functions
pub(super) fn unsupported_type_error(ts_type: TsType, source_map: &SourceMap) -> ErrorMessage {
    ErrorMessage {
        title: "Type not supported by azle".to_string(),
        origin: source_map.get_origin(ts_type.get_span()),
        line_number: source_map.get_line_number(ts_type.get_span()),
        source: source_map.get_source(ts_type.get_span()),
        range: source_map.get_range(ts_type.get_span()),
        annotation: format!("{} type is not supported", ts_type.type_to_string()),
        suggestion: None,
    }
}

impl GetSpan for TsType {
    fn get_span(&self) -> Span {
        match self {
            TsType::TsKeywordType(keyword) => keyword.span,
            TsType::TsThisType(this) => this.span,
            TsType::TsFnOrConstructorType(fn_or_const) => match fn_or_const {
                TsFnOrConstructorType::TsFnType(fn_type) => fn_type.span,
                TsFnOrConstructorType::TsConstructorType(const_type) => const_type.span,
            },
            TsType::TsTypeRef(type_ref) => type_ref.span,
            TsType::TsTypeQuery(type_query) => type_query.span,
            TsType::TsTypeLit(type_lit) => type_lit.span,
            TsType::TsArrayType(array) => array.span,
            TsType::TsTupleType(tuple) => tuple.span,
            TsType::TsOptionalType(opt) => opt.span,
            TsType::TsRestType(rest) => rest.span,
            TsType::TsUnionOrIntersectionType(union_or_inter) => match union_or_inter {
                TsUnionOrIntersectionType::TsUnionType(union) => union.span,
                TsUnionOrIntersectionType::TsIntersectionType(inter) => inter.span,
            },
            TsType::TsConditionalType(cond) => cond.span,
            TsType::TsInferType(infer) => infer.span,
            TsType::TsParenthesizedType(paren) => paren.span,
            TsType::TsTypeOperator(operator) => operator.span,
            TsType::TsIndexedAccessType(index) => index.span,
            TsType::TsMappedType(map) => map.span,
            TsType::TsLitType(lit_type) => lit_type.span,
            TsType::TsTypePredicate(pred) => pred.span,
            TsType::TsImportType(import) => import.span,
        }
    }
}

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
