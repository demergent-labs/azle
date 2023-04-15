use crate::{
    traits::{GetSourceFileInfo, GetSourceText},
    ts_ast::azle_type::AzleFnType,
};

impl GetSourceText for AzleFnType<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_text(self.ts_fn_type.span)
    }
}
