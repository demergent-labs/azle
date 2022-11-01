use super::AzlePropertySignature;
use crate::ts_ast::{source_map::GetSourceFileInfo, GetSourceText};

impl GetSourceText for AzlePropertySignature<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_source(self.ts_property_signature.span)
    }
}
