use swc_ecma_ast::{TsFnParam, TsFnType};

use crate::{canister_method::AnnotatedFnDecl, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ArrayDestructuringInParamsNotSupported {}

impl ArrayDestructuringInParamsNotSupported {
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

impl From<ArrayDestructuringInParamsNotSupported> for crate::Error {
    fn from(error: ArrayDestructuringInParamsNotSupported) -> Self {
        Self::ArrayDestructuringInParamsNotSupported(error)
    }
}

impl std::fmt::Display for ArrayDestructuringInParamsNotSupported {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "TODO")
    }
}
