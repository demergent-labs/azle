use swc_ecma_ast::TsTypeElement;

use crate::ts_ast::SourceMapped;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct VariantPropertySignature {}

impl VariantPropertySignature {
    pub fn from_ts_type_element(sm_ts_type_elements: &SourceMapped<TsTypeElement>) -> Self {
        Self {}
    }
}

impl From<VariantPropertySignature> for crate::Error {
    fn from(error: VariantPropertySignature) -> Self {
        Self::VariantPropertySignature(error)
    }
}

impl std::fmt::Display for VariantPropertySignature {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "TODO")
    }
}
