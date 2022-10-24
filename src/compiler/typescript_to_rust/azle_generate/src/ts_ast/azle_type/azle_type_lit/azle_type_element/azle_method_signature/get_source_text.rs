use super::AzleTypeElement;
use crate::ts_ast::{ast_traits::GetSpan, source_map::GetSourceFileInfo, GetSourceText};

impl GetSourceText for AzleTypeElement<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_source(self.ts_type_element.get_span())
    }
}
