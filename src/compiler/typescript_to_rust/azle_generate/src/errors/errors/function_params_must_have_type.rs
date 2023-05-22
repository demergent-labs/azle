use swc_ecma_ast::{TsFnParam, TsFnType};

use crate::ts_ast::SourceMapped;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct FunctionParamsMustHaveType {}

impl FunctionParamsMustHaveType {
    pub fn from_ts_fn_type(sm_ts_fn_type: &SourceMapped<TsFnType>) -> Self {
        Self {}
    }

    pub fn from_ts_fn_param(ts_fn_param: &TsFnParam) -> Self {
        Self {}
    }
}

impl From<FunctionParamsMustHaveType> for crate::Error {
    fn from(error: FunctionParamsMustHaveType) -> Self {
        Self::FunctionParamsMustHaveType(error)
    }
}
