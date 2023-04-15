use swc_common::Span;
use swc_ecma_ast::TsMethodSignature;

use crate::ts_ast::traits::GetSpan;

impl GetSpan for TsMethodSignature {
    fn get_span(&self) -> Span {
        self.span
    }
}
