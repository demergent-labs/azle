use swc_common::Span;
use swc_ecma_ast::TsPropertySignature;

use crate::traits::GetSpan;

impl GetSpan for TsPropertySignature {
    fn get_span(&self) -> Span {
        self.span
    }
}
