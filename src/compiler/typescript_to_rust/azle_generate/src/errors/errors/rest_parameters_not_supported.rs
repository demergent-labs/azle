use swc_ecma_ast::{TsFnParam, TsFnType};

use crate::{canister_method::AnnotatedFnDecl, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RestParametersNotSupported {}

impl RestParametersNotSupported {
    pub fn from_ts_fn_param(ts_fn_param: &TsFnParam) -> Self {
        Self {}
    }

    pub fn from_annotated_fn_decl(annotated_fn_decl: &AnnotatedFnDecl) -> Self {
        Self {}
    }

    pub fn from_ts_fn_type(sm_ts_fn_type: &SourceMapped<TsFnType>) -> Self {
        Self {}
    }
}

impl From<RestParametersNotSupported> for crate::Error {
    fn from(error: RestParametersNotSupported) -> Self {
        Self::RestParametersNotSupported(error)
    }
}
