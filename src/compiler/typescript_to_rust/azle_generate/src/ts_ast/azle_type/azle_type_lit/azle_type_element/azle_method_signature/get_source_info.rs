use super::AzleMethodSignature;
use crate::ts_ast::{ast_traits::GetSourceInfo, source_map::GetSourceFileInfo};

impl GetSourceInfo for AzleMethodSignature<'_> {
    fn get_source(&self) -> String {
        self.source_map.get_source(self.ts_method_signature.span)
    }

    fn get_line_number(&self) -> usize {
        self.source_map
            .get_line_number(self.ts_method_signature.span)
    }

    fn get_origin(&self) -> String {
        self.source_map.get_origin(self.ts_method_signature.span)
    }

    fn get_range(&self) -> (usize, usize) {
        self.source_map.get_range(self.ts_method_signature.span)
    }
}
