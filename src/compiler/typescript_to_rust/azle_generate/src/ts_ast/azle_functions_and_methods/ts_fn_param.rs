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
                None => panic!("Function parameter must have a type"),
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
