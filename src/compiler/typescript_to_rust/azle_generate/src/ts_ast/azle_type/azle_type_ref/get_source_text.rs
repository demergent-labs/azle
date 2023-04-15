use super::AzleTypeRef;
use crate::traits::{GetSourceFileInfo, GetSourceText};

impl GetSourceText for AzleTypeRef<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_text(self.ts_type_ref.span)
    }
}
