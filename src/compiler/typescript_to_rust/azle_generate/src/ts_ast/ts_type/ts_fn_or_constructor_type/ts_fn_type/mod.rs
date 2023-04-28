use swc_ecma_ast::{TsFnParam, TsFnType, TsType, TsTypeAnn};

use crate::{traits::GetTsType, ts_ast::SourceMapped};

mod errors;
mod get_span;
mod to_candid_type;

impl SourceMapped<'_, TsFnType> {
    fn get_ts_fn_params(&self) -> Vec<TsFnParam> {
        self.params.clone()
    }

    pub fn get_ts_type_ann(&self) -> TsTypeAnn {
        self.type_ann.clone()
    }

    pub fn get_param_types(&self) -> Vec<TsType> {
        self.get_ts_fn_params().iter().fold(vec![], |acc, param| {
            vec![acc, vec![param.get_ts_type().clone()]].concat()
        })
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
