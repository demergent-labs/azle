use swc_ecma_ast::TsFnOrConstructorType;

use crate::ts_ast::ast_traits::GetSpan;

impl GetSpan for TsFnOrConstructorType {
    fn get_span(&self) -> swc_common::Span {
        match self {
            TsFnOrConstructorType::TsFnType(ts_fn_type) => ts_fn_type.span,
            TsFnOrConstructorType::TsConstructorType(ts_constructor_type) => {
                ts_constructor_type.span
            }
        }
    }
}
