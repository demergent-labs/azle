use swc_common::SourceMap;
use swc_ecma_ast::TsKeywordType;

use crate::{
    cdk_act::ToActDataType,
    ts_ast::{source_map::GetSourceFileInfo, GetSourceText},
};

#[derive(Clone)]
pub struct AzleKeywordType<'a> {
    pub ts_keyword_type: TsKeywordType,
    pub source_map: &'a SourceMap,
}

impl GetSourceText for AzleKeywordType<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_text(self.ts_keyword_type.span)
    }
}

impl ToActDataType for AzleKeywordType<'_> {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> crate::cdk_act::ActDataType {
        todo!()
    }
}
