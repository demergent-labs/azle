use swc_common::{BytePos, Span};

use crate::ts_ast::source_map::Range;

pub trait GetSourceFileInfo {
    fn get_text(&self, span: Span) -> String;
    fn get_origin(&self, span: Span) -> String;
    fn get_source(&self, span: Span) -> String;
    fn get_source_from_range(&self, range: (BytePos, BytePos)) -> String;
    fn get_line_number(&self, span: Span) -> usize;
    fn generate_line_highlight(&self, span: Span) -> String;
    fn generate_highlighted_line(&self, span: Span) -> String;
    fn get_range(&self, span: Span) -> Range;
    fn get_multi_line_range(&self, span: &Span, adjuster: usize) -> Range;
    fn generate_source_with_range_replaced(
        &self,
        span: Span,
        range: Range,
        replacement: &String,
    ) -> String;
    fn generate_modified_source(&self, span: Span, replacement: &String) -> String;
    fn generate_modified_range(&self, span: Span, replacement: &String) -> Range;
}
