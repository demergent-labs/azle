use std::ops::Deref;

use swc_ecma_ast::{TsType, TsTypeRef};

use crate::ts_ast::SourceMapped;

mod errors;
mod get_name;
mod get_span;
mod to_candid_type;

impl SourceMapped<'_, TsTypeRef> {
    pub fn get_ts_type(&self) -> SourceMapped<TsType> {
        match &self.type_params {
            Some(params) => {
                if params.params.len() != 1 {
                    panic!("{}", self.wrong_number_of_params_error())
                }
                let inner_type = params.params[0].deref();
                SourceMapped::new(inner_type, self.source_map)
            }
            None => panic!("{}", self.wrong_number_of_params_error()),
        }
    }
}
