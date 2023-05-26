use swc_ecma_ast::TsTypeElement;

use crate::{
    errors::{CompilerOutput, Suggestion},
    traits::{GetSourceFileInfo, GetSourceInfo, GetSpan, TypeToString},
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct VariantPropertySignature {
    compiler_output: CompilerOutput,
}

impl VariantPropertySignature {
    pub fn from_ts_type_element(sm_ts_type_elements: &SourceMapped<TsTypeElement>) -> Self {
        Self {
            compiler_output: sm_ts_type_elements.variant_property_signature_error(),
        }
    }
}

impl std::error::Error for VariantPropertySignature {}

impl From<VariantPropertySignature> for crate::Error {
    fn from(error: VariantPropertySignature) -> Self {
        Self::VariantPropertySignature(error)
    }
}

impl std::fmt::Display for VariantPropertySignature {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.compiler_output)
    }
}

impl SourceMapped<'_, TsTypeElement> {
    fn variant_property_signature_error(&self) -> CompilerOutput {
        let replacement = "property_name: null".to_string();
        CompilerOutput {
            title: "Invalid Variant".to_string(),
            location: self.get_location(),
            annotation: format!("{} is not allowed here.", self.type_to_string()),
            suggestion: Some(Suggestion {
                title: "Variant members must be properties".to_string(),
                source: self
                    .source_map
                    .generate_modified_source(self.get_span(), &replacement),
                range: self
                    .source_map
                    .generate_modified_range(self.get_span(), &replacement),
                annotation: Some("For example".to_string()),
                import_suggestion: None,
            }),
        }
    }
}
