use swc_common::Span;
use swc_ecma_ast::TsType;

pub trait GetSpan {
    fn get_span(&self) -> Span;
}

impl GetSpan for TsType {
    fn get_span(&self) -> Span {
        match self {
            TsType::TsKeywordType(keyword) => keyword.span,
            TsType::TsThisType(this) => this.span,
            TsType::TsFnOrConstructorType(fn_or_const) => match fn_or_const {
                swc_ecma_ast::TsFnOrConstructorType::TsFnType(fn_type) => fn_type.span,
                swc_ecma_ast::TsFnOrConstructorType::TsConstructorType(const_type) => {
                    const_type.span
                }
            },
            TsType::TsTypeRef(type_ref) => type_ref.span,
            TsType::TsTypeQuery(type_query) => type_query.span,
            TsType::TsTypeLit(type_lit) => type_lit.span,
            TsType::TsArrayType(array) => array.span,
            TsType::TsTupleType(tuple) => tuple.span,
            TsType::TsOptionalType(opt) => opt.span,
            TsType::TsRestType(rest) => rest.span,
            TsType::TsUnionOrIntersectionType(union_or_inter) => match union_or_inter {
                swc_ecma_ast::TsUnionOrIntersectionType::TsUnionType(union) => union.span,
                swc_ecma_ast::TsUnionOrIntersectionType::TsIntersectionType(inter) => inter.span,
            },
            TsType::TsConditionalType(cond) => cond.span,
            TsType::TsInferType(infer) => infer.span,
            TsType::TsParenthesizedType(paren) => paren.span,
            TsType::TsTypeOperator(oper) => oper.span,
            TsType::TsIndexedAccessType(index) => index.span,
            TsType::TsMappedType(map) => map.span,
            TsType::TsLitType(lit_type) => lit_type.span,
            TsType::TsTypePredicate(pred) => pred.span,
            TsType::TsImportType(import) => import.span,
        }
    }
}
