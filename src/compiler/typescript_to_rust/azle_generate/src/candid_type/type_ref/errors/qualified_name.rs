use swc_ecma_ast::TsTypeRef;

use crate::ts_ast::SourceMapped;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct QualifiedName {}

impl QualifiedName {
    pub fn from_ts_type_ref(sm_ts_type_ref: &SourceMapped<TsTypeRef>) -> Self {
        Self {}
    }
}

impl From<QualifiedName> for crate::Error {
    fn from(error: QualifiedName) -> Self {
        Self::QualifiedName(error)
    }
}

impl std::fmt::Display for QualifiedName {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "TODO")
    }
}
