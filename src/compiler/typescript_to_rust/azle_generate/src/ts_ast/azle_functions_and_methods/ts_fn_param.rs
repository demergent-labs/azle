use cdk_framework::nodes::ActFnParam;
use swc_ecma_ast::{TsFnParam, TsType};

use super::{GetName, GetTsType};

impl GetName for TsFnParam {
    fn get_name(&self) -> &str {
        match self {
            TsFnParam::Ident(identifier) => identifier.id.get_name(),
            TsFnParam::Array(_) => todo!(),
            TsFnParam::Rest(_) => todo!(),
            TsFnParam::Object(_) => todo!(),
        }
    }
}

impl GetTsType for TsFnParam {
    fn get_ts_type(&self) -> TsType {
        match self {
            TsFnParam::Ident(identifier) => match &identifier.type_ann {
                Some(param_type) => param_type.get_ts_type(),
                None => panic!("Function parameters must have a type"),
            },
            TsFnParam::Array(_) => {
                panic!("Array destructuring in parameters is unsupported at this time")
            }
            TsFnParam::Rest(_) => panic!("Rest parameters are not supported at this time"),
            TsFnParam::Object(_) => {
                panic!("Object destructuring in parameters is unsupported at this time")
            }
        }
    }
}

pub trait ToActFnParam {
    fn to_act_fn_param(&self) -> Result<ActFnParam, String>;
}

impl ToActFnParam for TsFnParam {
    fn to_act_fn_param(&self) -> Result<ActFnParam, String> {
        match self {
            TsFnParam::Ident(identifier) => {
                let name = identifier.get_name().to_string();
                let data_type = match &identifier.type_ann {
                    Some(ts_type_ann) => {
                        // TODO: I need to either get a source map in here, or
                        // find a different way to do this
                        let azle_type =
                            AzleType::from_ts_type(ts_type_ann.get_ts_type(), self.source_map);
                        azle_type.to_act_data_type(&None)
                    }
                    None => return Err("Function parameters must have a type".to_string()),
                };
                Ok(ActFnParam { name, data_type })
            }
            TsFnParam::Array(_) => {
                Err("Array destructuring in parameters is unsupported at this time".to_string())
            }
            TsFnParam::Rest(_) => Err("Rest parameters are not supported at this time".to_string()),
            TsFnParam::Object(_) => {
                Err("Object destructuring in parameters is unsupported at this time".to_string())
            }
        }
    }
}
