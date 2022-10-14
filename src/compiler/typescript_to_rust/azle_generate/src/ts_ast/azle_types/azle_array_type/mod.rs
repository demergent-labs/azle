pub mod get_dependencies;
pub mod get_source_text;
pub mod to_act_data_type;

use swc_common::SourceMap;
use swc_ecma_ast::TsArrayType;

#[derive(Clone)]
pub struct AzleArrayType<'a> {
    pub ts_array_type: TsArrayType,
    pub source_map: &'a SourceMap,
}
