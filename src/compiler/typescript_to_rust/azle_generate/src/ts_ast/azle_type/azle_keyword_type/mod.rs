use swc_common::SourceMap;
use swc_ecma_ast::TsKeywordType;

mod errors;
mod get_source_info;
mod get_source_text;
mod to_act_data_type;

#[derive(Clone)]
pub struct AzleKeywordType<'a> {
    pub ts_keyword_type: TsKeywordType,
    pub source_map: &'a SourceMap,
}
