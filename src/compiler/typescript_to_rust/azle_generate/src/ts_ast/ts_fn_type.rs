use cdk_framework::{nodes::ActFnParam, ToActDataType};
use swc_ecma_ast::{TsFnParam, TsFnType, TsType};

use crate::ts_ast::{
    ast_traits::GetTsType, azle_type::AzleType, source_map::SourceMapped, GetName,
};

impl SourceMapped<'_, TsFnType> {
    pub fn build_act_fn_params(&self) -> Vec<ActFnParam> {
        self.params
            .iter()
            .map(|param| match param {
                TsFnParam::Ident(identifier) => {
                    let name = identifier.get_name().to_string();
                    let data_type = match &identifier.type_ann {
                        Some(ts_type_ann) => {
                            let azle_type =
                                AzleType::from_ts_type(ts_type_ann.get_ts_type(), self.source_map);
                            azle_type.to_act_data_type(&None)
                        }
                        None => panic!("Function parameters must have a type"),
                    };
                    ActFnParam { name, data_type }
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

    pub fn get_param_ts_types(&self) -> Vec<TsType> {
        self.params
            .iter()
            .map(|param| match param {
                TsFnParam::Ident(identifier) => match &identifier.type_ann {
                    Some(ts_type_ann) => ts_type_ann.get_ts_type(),
                    None => panic!("Function parameters must have a type"),
                },
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
