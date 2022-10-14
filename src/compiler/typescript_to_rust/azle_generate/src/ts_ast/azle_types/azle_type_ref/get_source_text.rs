use crate::ts_ast::{source_map::source_map::GetSourceFileInfo, GetSourceText};

use super::AzleTypeRef;

impl GetSourceText for AzleTypeRef<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_span_text(self.ts_type_ref.span)
    }
}
