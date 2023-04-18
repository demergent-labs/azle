use swc_common::Span;
use swc_ecma_ast::TsTypeRef;

use crate::traits::GetSpan;

impl GetSpan for TsTypeRef {
    fn get_span(&self) -> Span {
        self.span
    }
}
