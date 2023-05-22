mod variant_property_signature;
mod wrong_number_of_params;

use swc_ecma_ast::TsTypeElement;

use crate::{
    errors::{CompilerOutput, Suggestion},
    traits::{GetSourceFileInfo, GetSourceInfo, GetSpan, TypeToString},
    ts_ast::SourceMapped,
};

pub use variant_property_signature::VariantPropertySignature;
pub use wrong_number_of_params::WrongNumberOfParams;

impl SourceMapped<'_, TsTypeElement> {
    pub(super) fn _variant_property_signature_error(&self) -> CompilerOutput {
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
