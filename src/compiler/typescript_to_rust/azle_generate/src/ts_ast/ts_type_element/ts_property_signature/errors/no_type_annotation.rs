use swc_ecma_ast::TsPropertySignature;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct NoTypeAnnotation {
    compiler_output: CompilerOutput,
}

impl NoTypeAnnotation {
    pub fn from_ts_property_signature(sm_property_sig: &SourceMapped<TsPropertySignature>) -> Self {
        Self {
            compiler_output: sm_property_sig.no_type_annotation_error(),
        }
    }
}

impl From<NoTypeAnnotation> for crate::Error {
    fn from(error: NoTypeAnnotation) -> Self {
        Self::NoTypeAnnotation(error)
    }
}

impl std::fmt::Display for NoTypeAnnotation {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.compiler_output)
    }
}

impl SourceMapped<'_, TsPropertySignature> {
    fn no_type_annotation_error(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Type Annotation Needed".to_string(),
            location: Location {
                origin: self.get_origin(),
                line_number: self.get_line_number(),
                source: self.get_source(),
                range: self.get_range(),
            },
            annotation: "type annotation needed for this member".to_string(),
            suggestion: None,
        }
    }
}
