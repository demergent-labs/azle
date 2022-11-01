use swc_common::SourceMap;
use swc_ecma_ast::TsTypeElement;

use super::AzleTypeElement;
use crate::{
    errors::{ErrorMessage, Suggestion},
    ts_ast::{
        ast_traits::{GetSourceInfo, GetSpan, TypeToString},
        source_map::GetSourceFileInfo,
    },
};

pub(super) fn unsupported_type_error(
    ts_type_element: TsTypeElement,
    source_map: &SourceMap,
) -> ErrorMessage {
    ErrorMessage {
        title: "Type is not supported by azle".to_string(),
        origin: source_map.get_origin(ts_type_element.get_span()),
        line_number: source_map.get_line_number(ts_type_element.get_span()),
        source: source_map.get_source(ts_type_element.get_span()),
        range: source_map.get_range(ts_type_element.get_span()),
        annotation: format!("{} type is not supported", ts_type_element.type_to_string()),
        suggestion: None,
    }
}

impl AzleTypeElement<'_> {
    pub(super) fn record_property_signature_error(&self) -> ErrorMessage {
        let replacement = "property_name: boolean".to_string();
        ErrorMessage {
            title: "Invalid Record".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: format!("{} is not allowed here.", self.type_to_string()),
            suggestion: Some(Suggestion {
                title: "Variant members must be properties.".to_string(),
                source: self
                    .get_source_map()
                    .generate_modified_source(self.get_span(), &replacement),
                range: self
                    .get_source_map()
                    .generate_modified_range(self.get_span(), &replacement),
                annotation: Some("For example".to_string()),
                import_suggestion: None,
            }),
        }
    }

    pub(super) fn variant_property_signature_error(&self) -> ErrorMessage {
        let replacement = "property_name: null".to_string();
        ErrorMessage {
            title: "Invalid Variant".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: format!("{} is not allowed here.", self.type_to_string()),
            suggestion: Some(Suggestion {
                title: "Variant members must be properties".to_string(),
                source: self
                    .get_source_map()
                    .generate_modified_source(self.get_span(), &replacement),
                range: self
                    .get_source_map()
                    .generate_modified_range(self.get_span(), &replacement),
                annotation: Some("For example".to_string()),
                import_suggestion: None,
            }),
        }
    }
}
