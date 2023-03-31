use cdk_framework::act::node::Param;
use swc_ecma_ast::{TsFnParam, TsFnType};

use crate::ts_ast::{azle_type::AzleType, source_map::SourceMapped, traits::GetTsType, GetName};

impl SourceMapped<'_, TsFnType> {
    pub fn build_act_fn_params(&self) -> Vec<Param> {
        self.params
            .iter()
            .map(|param| match param {
                TsFnParam::Ident(identifier) => {
                    let name = identifier.get_name().to_string();
                    let candid_type = match &identifier.type_ann {
                        Some(ts_type_ann) => {
                            let azle_type =
                                AzleType::from_ts_type(ts_type_ann.get_ts_type(), self.source_map);
                            azle_type.to_data_type()
                        }
                        None => panic!("Function parameters must have a type"),
                    };
                    Param { name, candid_type }
                }
                TsFnParam::Array(_) => {
                    panic!("Array destructuring in parameters is unsupported at this time")
                }
                TsFnParam::Rest(_) => {
                    panic!("Rest parameters are not supported at this time")
                }
                TsFnParam::Object(_) => {
                    panic!("Object destructuring in parameters is unsupported at this time")
                }
            })
            .collect()
    }
}
