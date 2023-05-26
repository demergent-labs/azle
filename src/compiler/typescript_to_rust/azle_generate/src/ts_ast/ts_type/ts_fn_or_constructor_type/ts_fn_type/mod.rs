use swc_ecma_ast::{TsFnParam, TsFnType, TsType, TsTypeAnn};

use crate::{
    errors::{
        errors::{
            ArrayDestructuringInParamsNotSupported, FunctionParamsMustHaveType,
            ObjectDestructuringNotSupported, RestParametersNotSupported,
        },
        CollectResults,
    },
    traits::{GetTsType, GetTsTypeWithError},
    ts_ast::SourceMapped,
    Error,
};

pub mod errors;
mod get_span;
mod to_candid_type;

impl SourceMapped<'_, TsFnType> {
    fn get_ts_fn_params(&self) -> Vec<TsFnParam> {
        self.params.clone()
    }

    pub fn get_ts_type_ann(&self) -> TsTypeAnn {
        self.type_ann.clone()
    }

    pub fn get_param_types(&self) -> Result<Vec<TsType>, Vec<Error>> {
        self.get_ts_fn_params()
            .iter()
            .map(|param| param.get_ts_type().map_err(Into::<Vec<Error>>::into))
            .collect_results()
    }
}

impl GetTsTypeWithError for TsFnParam {
    fn get_ts_type(&self) -> Result<TsType, Error> {
        match self {
            TsFnParam::Ident(identifier) => match &identifier.type_ann {
                Some(param_type) => Ok(param_type.get_ts_type()),
                None => Err(Into::<Error>::into(
                    FunctionParamsMustHaveType::from_ts_fn_param(self),
                )),
            },
            TsFnParam::Array(_) => {
                Err(ArrayDestructuringInParamsNotSupported::from_ts_fn_param(self).into())
            }
            TsFnParam::Rest(_) => Err(RestParametersNotSupported::from_ts_fn_param(self).into()),
            TsFnParam::Object(_) => {
                Err(ObjectDestructuringNotSupported::from_ts_fn_param(self).into())
            }
        }
    }
}
