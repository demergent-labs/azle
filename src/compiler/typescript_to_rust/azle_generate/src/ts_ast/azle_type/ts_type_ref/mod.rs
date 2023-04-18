use swc_ecma_ast::TsTypeRef;

use crate::ts_ast::{azle_type::AzleType, SourceMapped};

mod errors;
mod get_name;
mod get_span;

impl SourceMapped<'_, TsTypeRef> {
    pub fn get_enclosed_azle_type(&self) -> AzleType {
        match &self.type_params {
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
