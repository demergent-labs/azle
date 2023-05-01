use swc_common::{Loc, SourceMap, Span};

use crate::traits::GetSourceFileInfo;

pub trait PrivateGetSourceFileInfo {
    fn get_loc(&self, span: Span) -> Loc;
    fn get_start_col(&self, span: Span) -> usize;
    fn get_end_col(&self, span: Span) -> usize;
    fn get_well_formed_end_line(&self, span: Span) -> String;
    fn get_well_formed_line(&self, span: Span) -> String;
}

impl PrivateGetSourceFileInfo for SourceMap {
    fn get_loc(&self, span: Span) -> Loc {
        self.lookup_char_pos(span.lo)
    }

    fn get_start_col(&self, span: Span) -> usize {
        let loc = self.lookup_char_pos(span.lo);
        loc.col_display
    }

    fn get_end_col(&self, span: Span) -> usize {
        let loc = self.lookup_char_pos(span.hi);
        loc.col_display
    }

    fn get_well_formed_end_line(&self, span: Span) -> String {
        let line = self.get_source(span);
        line[self.get_end_col(span)..].to_string()
    }

    fn get_well_formed_line(&self, span: Span) -> String {
        let line = self.get_source(span);
        line[..self.get_start_col(span)].to_string()
    }
}
