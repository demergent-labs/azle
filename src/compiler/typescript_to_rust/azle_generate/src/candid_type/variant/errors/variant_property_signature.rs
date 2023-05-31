use swc_ecma_ast::TsTypeElement;

use crate::{
    errors::{CompilerOutput, Location, Suggestion, SuggestionModifications},
    traits::{GetSourceFileInfo, GetSourceInfo, GetSpan, TypeToString},
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct VariantPropertySignature {
    location: Location,
    type_name: String,
    suggestion_modifications: SuggestionModifications,
}

impl VariantPropertySignature {
    pub fn from_ts_type_element(sm_ts_type_elements: &SourceMapped<TsTypeElement>) -> Self {
        let replacement = "property_name: null".to_string();
        let suggestion_modifications = (
            sm_ts_type_elements
                .source_map
                .generate_modified_source(sm_ts_type_elements.get_span(), &replacement),
            sm_ts_type_elements
                .source_map
                .generate_modified_range(sm_ts_type_elements.get_span(), &replacement),
        );

        Self {
            location: sm_ts_type_elements.get_location(),
            suggestion_modifications,
            type_name: sm_ts_type_elements.type_to_string(),
        }
    }

    fn variant_property_signature_error(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Invalid Variant".to_string(),
            location: self.location.clone(),
            annotation: format!("{} is not allowed here.", self.type_name),
            suggestion: Some(Suggestion {
                title: "Variant members must be properties".to_string(),
                annotation: Some("For example".to_string()),
                import_suggestion: None,
                source: self.suggestion_modifications.0.clone(),
                range: self.suggestion_modifications.1,
            }),
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
        write!(f, "{}", self.variant_property_signature_error())
    }
}

impl SourceMapped<'_, TsTypeElement> {}
