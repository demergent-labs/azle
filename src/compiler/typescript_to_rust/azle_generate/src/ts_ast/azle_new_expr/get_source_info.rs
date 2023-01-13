use super::AzleNewExpr;
use crate::ts_ast::{ast_traits::GetSourceInfo, source_map::GetSourceFileInfo};

impl GetSourceInfo for AzleNewExpr<'_> {
    fn get_source(&self) -> String {
        self.source_map
            .get_source_from_range((self.new_expr.span.lo, self.new_expr.span.hi))
    }

    fn get_line_number(&self) -> usize {
        self.source_map.get_line_number(self.new_expr.span)
    }

    fn get_origin(&self) -> String {
        self.source_map.get_origin(self.new_expr.span)
    }

    fn get_range(&self) -> (usize, usize) {
        self.source_map.get_range(self.new_expr.span)
    }
}
