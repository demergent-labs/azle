use swc_common::Span;
use swc_ecma_ast::ClassProp;

use crate::traits::GetSpan;

impl GetSpan for ClassProp {
    fn get_span(&self) -> Span {
        self.span
    }
}
