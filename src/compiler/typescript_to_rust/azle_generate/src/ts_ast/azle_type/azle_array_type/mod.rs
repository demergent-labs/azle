use swc_common::SourceMap;
use swc_ecma_ast::TsArrayType;

use super::AzleType;

mod get_dependencies;
mod get_source_info;
mod get_source_text;
mod to_act_data_type;

#[derive(Clone)]
pub struct AzleArrayType<'a> {
    pub ts_array_type: TsArrayType,
    pub source_map: &'a SourceMap,
}

impl AzleArrayType<'_> {
    fn get_azle_elem(&self) -> AzleType {
        AzleType::from_ts_type(*self.ts_array_type.elem_type.clone(), self.source_map)
    }
}
