use swc_ecma_ast::{TsFnParam, TsType};

use crate::ts_ast::GetTsType;

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
