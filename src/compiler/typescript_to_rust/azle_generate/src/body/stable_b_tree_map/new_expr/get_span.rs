use swc_ecma_ast::NewExpr;

use crate::traits::GetSpan;

impl GetSpan for NewExpr {
    fn get_span(&self) -> swc_common::Span {
        self.span
    }
}
