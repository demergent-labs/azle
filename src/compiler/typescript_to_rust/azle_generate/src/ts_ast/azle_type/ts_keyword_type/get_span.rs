use swc_common::Span;
use swc_ecma_ast::TsKeywordType;

use crate::traits::GetSpan;

impl GetSpan for TsKeywordType {
    fn get_span(&self) -> Span {
        self.span
    }
}
