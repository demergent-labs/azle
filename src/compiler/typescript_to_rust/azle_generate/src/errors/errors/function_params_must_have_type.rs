use swc_ecma_ast::{TsFnParam, TsFnType};

use crate::{errors::Location, traits::GetSourceInfo, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct FunctionParamsMustHaveType {
    location: Location,
}

impl FunctionParamsMustHaveType {
    pub fn from_ts_fn_type(sm_ts_fn_type: &SourceMapped<TsFnType>) -> Self {
        Self {
            location: sm_ts_fn_type.get_location(),
        }
    }

    pub fn from_ts_fn_param(sm_ts_fn_param: &SourceMapped<TsFnParam>) -> Self {
        Self {
            location: sm_ts_fn_param.get_location(),
        }
    }
}

impl std::error::Error for FunctionParamsMustHaveType {}

impl From<FunctionParamsMustHaveType> for crate::Error {
    fn from(error: FunctionParamsMustHaveType) -> Self {
        Self::FunctionParamsMustHaveType(error)
    }
}

impl std::fmt::Display for FunctionParamsMustHaveType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Function parameters must have a type")
    }
}
