use swc_ecma_ast::TsPropertySignature;

use crate::ts_ast::{
    source_map::{GetSourceFileInfo, SourceMapped},
    traits::GetSourceInfo,
};

impl GetSourceInfo for SourceMapped<'_, TsPropertySignature> {
    fn get_source(&self) -> String {
        self.source_map.get_source(self.span)
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
