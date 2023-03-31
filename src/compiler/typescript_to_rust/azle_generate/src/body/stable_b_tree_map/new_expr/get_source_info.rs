use swc_ecma_ast::NewExpr;

use crate::ts_ast::{
    source_map::GetSourceFileInfo, source_map::SourceMapped, traits::GetSourceInfo,
};

impl GetSourceInfo for SourceMapped<'_, NewExpr> {
    fn get_source(&self) -> String {
        self.source_map
            .get_source_from_range((self.span.lo, self.span.hi))
    }

    fn get_line_number(&self) -> usize {
        self.source_map.get_line_number(self.span)
    }

    fn get_origin(&self) -> String {
        self.source_map.get_origin(self.span)
    }

    fn get_range(&self) -> (usize, usize) {
        self.source_map.get_range(self.span)
    }
}
