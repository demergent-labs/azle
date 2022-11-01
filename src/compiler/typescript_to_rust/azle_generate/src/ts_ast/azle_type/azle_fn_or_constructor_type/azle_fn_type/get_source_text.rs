use crate::ts_ast::{azle_type::AzleFnType, source_map::GetSourceFileInfo, GetSourceText};

impl GetSourceText for AzleFnType<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_text(self.ts_fn_type.span)
    }
}
