use swc_ecma_ast::TsPropertySignature;

use crate::{errors::ErrorMessage, traits::GetSourceInfo, ts_ast::SourceMapped};

impl SourceMapped<'_, TsPropertySignature> {
    pub(super) fn no_type_annotation_error(&self) -> ErrorMessage {
        ErrorMessage {
            title: "Type Annotation Needed".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: "type annotation needed for this member".to_string(),
            suggestion: None,
        }
    }

    /// Note: This shouldn't ever be hit because it is mostly likely caught by
    /// by the `unsupported_type_error` function in
    /// ts_ast/azle_type/azle_type_lit/azle_type_element/errors.rs
    ///
    pub(super) fn unsupported_member_name_error(&self) -> ErrorMessage {
        ErrorMessage {
            title: "Unsupported member name".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: "change this to a simple identifier".to_string(),
            suggestion: None,
        }
    }

    // TODO I liked these functions because it said, hey this is a record or
    // this is a variant and so it needs this. As opposed to a canister that
    // needs something else entirely. If we could figure out how to get that
    // much specificity again that would be great

    // pub(super) fn record_property_signature_error(&self) -> ErrorMessage {
    //     let replacement = "property_name: boolean".to_string();
    //     ErrorMessage {
    //         title: "Invalid Record".to_string(),
    //         origin: self.get_origin(),
    //         line_number: self.get_line_number(),
    //         source: self.get_source(),
    //         range: self.get_range(),
    //         annotation: format!(
    //             "{} is not allowed here.",
    //             "This is probably in the wrong place"
    //         ),
    //         suggestion: Some(Suggestion {
    //             title: "Variant members must be properties.".to_string(),
    //             source: self
    //                 .source_map
    //                 .generate_modified_source(self.ts_property_signature.span, &replacement),
    //             range: self
    //                 .source_map
    //                 .generate_modified_range(self.ts_property_signature.span, &replacement),
    //             annotation: Some("For example".to_string()),
    //             import_suggestion: None,
    //         }),
    //     }
    // }

    // pub(super) fn variant_property_signature_error(&self) -> ErrorMessage {
    //     let replacement = "property_name: null".to_string();
    //     ErrorMessage {
    //         title: "Invalid Variant".to_string(),
    //         origin: self.get_origin(),
    //         line_number: self.get_line_number(),
    //         source: self.get_source(),
    //         range: self.get_range(),
    //         annotation: format!("{} is not allowed here.", self.type_to_string()),
    //         suggestion: Some(Suggestion {
    //             title: "Variant members must be properties".to_string(),
    //             source: self
    //                 .source_map
    //                 .generate_modified_source(self.ts_type_element.get_span(), &replacement),
    //             range: self
    //                 .source_map
    //                 .generate_modified_range(self.ts_type_element.get_span(), &replacement),
    //             annotation: Some("For example".to_string()),
    //             import_suggestion: None,
    //         }),
    //     }
    // }
}
