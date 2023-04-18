use swc_common::Span;
use swc_ecma_ast::TsFnType;

use crate::traits::GetSpan;

impl GetSpan for TsFnType {
    fn get_span(&self) -> Span {
        self.span
    }
}
