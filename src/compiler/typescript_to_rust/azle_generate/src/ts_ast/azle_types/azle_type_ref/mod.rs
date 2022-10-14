pub mod errors;
pub mod get_dependencies;
pub mod get_source_text;
pub mod to_act_data_type;

use swc_common::SourceMap;
use swc_ecma_ast::{TsType, TsTypeRef};

use crate::ts_ast::GetName;

#[derive(Clone)]
pub struct AzleTypeRef<'a> {
    pub ts_type_ref: TsTypeRef,
    pub source_map: &'a SourceMap,
}

impl GetName for AzleTypeRef<'_> {
    fn get_name(&self) -> &str {
        self.ts_type_ref.get_name()
    }
}

impl AzleTypeRef<'_> {
    fn get_enclosed_ts_type(&self) -> TsType {
        match &self.ts_type_ref.type_params {
            Some(params) => {
                if params.params.len() != 1 {
                    panic!("{}", self.wrong_number_of_params_error())
                }
                *params.params[0].clone()
            }
            None => panic!("{}", self.wrong_number_of_params_error()),
        }
    }
}
