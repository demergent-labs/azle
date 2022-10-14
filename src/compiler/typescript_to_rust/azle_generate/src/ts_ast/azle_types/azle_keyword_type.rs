use swc_common::SourceMap;
use swc_ecma_ast::TsKeywordType;

use crate::cdk_act::ToActDataType;

#[derive(Clone)]
pub struct AzleKeywordType<'a> {
    pub ts_keyword_type: TsKeywordType,
    pub source_map: &'a SourceMap,
}

impl ToActDataType for AzleKeywordType<'_> {
    fn to_act_data_type(
        &self,
        alias_name: &Option<&String>,
        source_map: &SourceMap,
    ) -> crate::cdk_act::ActDataType {
        todo!()
    }
}
