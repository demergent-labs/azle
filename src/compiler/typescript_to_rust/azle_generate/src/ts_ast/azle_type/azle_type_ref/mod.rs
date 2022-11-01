use swc_common::SourceMap;
use swc_ecma_ast::TsTypeRef;

use super::AzleType;

mod errors;
mod get_dependencies;
mod get_name;
mod get_source_info;
mod get_source_text;
mod to_act_data_type;

#[derive(Clone)]
pub struct AzleTypeRef<'a> {
    pub ts_type_ref: TsTypeRef,
    pub source_map: &'a SourceMap,
}

impl AzleTypeRef<'_> {
    pub(self) fn get_enclosed_azle_type(&self) -> AzleType {
        match &self.ts_type_ref.type_params {
            Some(params) => {
                if params.params.len() != 1 {
                    panic!("{}", self.wrong_number_of_params_error())
                }
                AzleType::from_ts_type(*params.params[0].clone(), self.source_map)
            }
            None => panic!("{}", self.wrong_number_of_params_error()),
        }
    }
}
