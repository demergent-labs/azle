use super::AzleArrayType;
use crate::ts_ast::source_map::source_map::GetSourceFileInfo;
use crate::ts_ast::GetSourceText;

impl GetSourceText for AzleArrayType<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_source(self.ts_array_type.span)
    }
}
