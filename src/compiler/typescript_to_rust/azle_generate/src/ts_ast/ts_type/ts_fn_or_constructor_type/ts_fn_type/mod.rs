use std::ops::Deref;

use cdk_framework::traits::CollectIterResults;
use swc_ecma_ast::{TsFnParam, TsFnType, TsType, TsTypeAnn};

use crate::{
    errors::errors::{
        ArrayDestructuringInParamsNotSupported, FunctionParamsMustHaveType,
        ObjectDestructuringNotSupported, RestParametersNotSupported,
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
        let param_to_ts_type = |param: &TsFnParam| {
            self.spawn(param)
                .get_ts_type()
                .map_err(Into::<Vec<Error>>::into)
        };
        self.get_ts_fn_params()
            .iter()
            .map(param_to_ts_type)
            .collect_results()
    }
}

impl GetTsTypeWithError for SourceMapped<'_, TsFnParam> {
    fn get_ts_type(&self) -> Result<TsType, Error> {
        match self.deref() {
            TsFnParam::Ident(identifier) => match &identifier.type_ann {
                Some(param_type) => Ok(param_type.get_ts_type()),
                None => Err(Into::<Error>::into(
                    FunctionParamsMustHaveType::from_ts_fn_param(self),
                )),
            },
            TsFnParam::Array(array_pat) => Err(
                ArrayDestructuringInParamsNotSupported::from_ts_fn_param(self, array_pat).into(),
            ),
            TsFnParam::Rest(rest_pat) => {
                Err(RestParametersNotSupported::from_ts_fn_param(self, rest_pat).into())
            }
            TsFnParam::Object(object_pat) => {
                Err(ObjectDestructuringNotSupported::from_ts_fn_param(self, object_pat).into())
            }
        }
    }
}
