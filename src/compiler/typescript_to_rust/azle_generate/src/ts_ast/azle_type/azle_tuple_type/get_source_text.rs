use super::AzleTupleType;
use crate::ts_ast::{source_map::GetSourceFileInfo, GetSourceText};

impl GetSourceText for AzleTupleType<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_source(self.ts_tuple_type.span)
    }
}
