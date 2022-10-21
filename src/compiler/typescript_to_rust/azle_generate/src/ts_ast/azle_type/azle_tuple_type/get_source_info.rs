use super::AzleTupleType;
use crate::ts_ast::{ast_traits::GetSourceInfo, source_map::GetSourceFileInfo};

impl GetSourceInfo for AzleTupleType<'_> {
    fn get_source(&self) -> String {
        self.source_map.get_source(self.ts_tuple_type.span)
    }

    fn get_line_number(&self) -> usize {
        self.source_map.get_line_number(self.ts_tuple_type.span)
    }

    fn get_origin(&self) -> String {
        self.source_map.get_origin(self.ts_tuple_type.span)
    }

    fn get_range(&self) -> (usize, usize) {
        self.source_map.get_range(self.ts_tuple_type.span)
    }
}
