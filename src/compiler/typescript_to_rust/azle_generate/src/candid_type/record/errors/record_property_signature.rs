use swc_ecma_ast::TsTypeElement;

use crate::ts_ast::SourceMapped;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RecordPropertySignature {}

impl RecordPropertySignature {
    pub fn from_ts_type_element(sm_ts_type_elements: &SourceMapped<TsTypeElement>) -> Self {
        Self {}
    }
}

impl From<RecordPropertySignature> for crate::Error {
    fn from(error: RecordPropertySignature) -> Self {
        Self::RecordPropertySignature(error)
    }
}

impl std::fmt::Display for RecordPropertySignature {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "TODO")
    }
}
