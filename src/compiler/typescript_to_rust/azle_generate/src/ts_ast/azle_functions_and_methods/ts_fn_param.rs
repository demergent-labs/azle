use swc_ecma_ast::TsFnParam;

use crate::ts_ast::ast_traits::{GetSpan, TypeToString};

impl GetSpan for TsFnParam {
    fn get_span(&self) -> swc_common::Span {
        match self {
            TsFnParam::Ident(ident) => ident.span,
            TsFnParam::Array(array) => array.span,
            TsFnParam::Rest(rest) => rest.span,
            TsFnParam::Object(object) => object.span,
        }
    }
}

impl TypeToString for TsFnParam {
    fn type_to_string(&self) -> String {
        match self {
            TsFnParam::Ident(_) => "ident",
            TsFnParam::Array(_) => "array",
            TsFnParam::Rest(_) => "rest",
            TsFnParam::Object(_) => "object",
        }
        .to_string()
    }
}
