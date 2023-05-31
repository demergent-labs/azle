use swc_common::Span;
use swc_ecma_ast::{TsFnParam, TsFnType};

use crate::traits::GetSpan;

impl GetSpan for TsFnType {
    fn get_span(&self) -> Span {
        self.span
    }
}

impl GetSpan for TsFnParam {
    fn get_span(&self) -> Span {
        match self {
            TsFnParam::Ident(ident) => ident.span,
            TsFnParam::Array(array) => array.span,
            TsFnParam::Rest(rest) => rest.span,
            TsFnParam::Object(object) => object.span,
        }
    }
}
