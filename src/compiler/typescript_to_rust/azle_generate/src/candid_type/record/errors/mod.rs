pub mod record_property_signature;

use swc_ecma_ast::TsTypeElement;

use crate::{
    errors::{CompilerOutput, Suggestion},
    traits::{GetSourceFileInfo, GetSourceInfo, GetSpan, TypeToString},
    ts_ast::SourceMapped,
};

impl SourceMapped<'_, TsTypeElement> {
    pub fn record_property_signature_error(&self) -> CompilerOutput {
        let replacement = "property_name: boolean".to_string();
        CompilerOutput {
            title: "Invalid Record".to_string(),
            location: self.get_location(),
            annotation: format!("{} is not allowed here.", self.type_to_string()),
            suggestion: Some(Suggestion {
                title: "Variant members must be properties.".to_string(),
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
