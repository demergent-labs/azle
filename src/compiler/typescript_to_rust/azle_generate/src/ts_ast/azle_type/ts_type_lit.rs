use swc_common::Span;
use swc_ecma_ast::TsTypeLit;

use crate::traits::GetSpan;

impl GetSpan for TsTypeLit {
    fn get_span(&self) -> Span {
        self.span
    }
}
