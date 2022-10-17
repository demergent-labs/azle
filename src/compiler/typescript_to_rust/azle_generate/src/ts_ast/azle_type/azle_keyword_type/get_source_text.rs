use super::AzleKeywordType;
use crate::ts_ast::{source_map::GetSourceFileInfo, GetSourceText};

impl GetSourceText for AzleKeywordType<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_text(self.ts_keyword_type.span)
    }
}
