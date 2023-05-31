use swc_ecma_ast::TsPropertySignature;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct NoTypeAnnotation {
    location: Location,
}

impl NoTypeAnnotation {
    pub fn from_ts_property_signature(sm_property_sig: &SourceMapped<TsPropertySignature>) -> Self {
        Self {
            location: sm_property_sig.get_location(),
        }
    }

    fn no_type_annotation_error(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Type Annotation Needed".to_string(),
            location: self.location.clone(),
            annotation: "type annotation needed for this member".to_string(),
            suggestion: None,
        }
    }
}

impl std::error::Error for NoTypeAnnotation {}

impl From<NoTypeAnnotation> for crate::Error {
    fn from(error: NoTypeAnnotation) -> Self {
        Self::NoTypeAnnotation(error)
    }
}

impl std::fmt::Display for NoTypeAnnotation {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.no_type_annotation_error())
    }
}

impl SourceMapped<'_, TsPropertySignature> {}
