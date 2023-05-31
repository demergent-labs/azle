use swc_ecma_ast::TsTypeElement;

use crate::{
    errors::{CompilerOutput, Location, Suggestion, SuggestionModifications},
    traits::{GetSourceFileInfo, GetSourceInfo, GetSpan, TypeToString},
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct RecordPropertySignature {
    location: Location,
    type_name: String,
    suggestion_modifications: SuggestionModifications,
}

impl RecordPropertySignature {
    pub fn from_ts_type_element(sm_ts_type_elements: &SourceMapped<TsTypeElement>) -> Self {
        let replacement = "property_name: boolean".to_string();
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

    fn record_property_signature_error(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Invalid Record".to_string(),
            location: self.location.clone(),
            annotation: format!("{} is not allowed here.", self.type_name),
            suggestion: Some(Suggestion {
                title: "Record members must be properties.".to_string(),
                source: self.suggestion_modifications.0.clone(),
                range: self.suggestion_modifications.1,
                annotation: Some("For example".to_string()),
                import_suggestion: None,
            }),
        }
    }
}

impl std::error::Error for RecordPropertySignature {}

impl From<RecordPropertySignature> for crate::Error {
    fn from(error: RecordPropertySignature) -> Self {
        Self::RecordPropertySignature(error)
    }
}

impl std::fmt::Display for RecordPropertySignature {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.record_property_signature_error())
    }
}
