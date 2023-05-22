use swc_ecma_ast::TsPropertySignature;

use crate::ts_ast::SourceMapped;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct NoTypeAnnotation {}

impl NoTypeAnnotation {
    pub fn from_ts_property_signature(sm_property_sig: &SourceMapped<TsPropertySignature>) -> Self {
        Self {}
    }
}

impl From<NoTypeAnnotation> for crate::Error {
    fn from(error: NoTypeAnnotation) -> Self {
        Self::NoTypeAnnotation(error)
    }
}
