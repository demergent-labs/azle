use super::AzleTypeRef;
use crate::ts_ast::{source_map::source_map::GetSourceFileInfo, GetSourceText};

impl GetSourceText for AzleTypeRef<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_text(self.ts_type_ref.span)
    }
}
