use swc_ecma_ast::TsTypeElement;

use super::AzleTypeElement;
use crate::{
    errors::{ErrorMessage, Suggestion},
    ts_ast::{
        ast_traits::{GetSourceInfo, GetSpan},
        source_map::GetSourceFileInfo,
    },
};

impl AzleTypeElement<'_> {
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
                    .source_map
                    .generate_modified_source(self.ts_type_element.get_span(), &replacement),
                range: self
                    .source_map
                    .generate_modified_range(self.ts_type_element.get_span(), &replacement),
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
                    .source_map
                    .generate_modified_source(self.ts_type_element.get_span(), &replacement),
                range: self
                    .source_map
                    .generate_modified_range(self.ts_type_element.get_span(), &replacement),
                annotation: Some("For example".to_string()),
                import_suggestion: None,
            }),
        }
    }

    fn type_to_string(&self) -> String {
        match &self.ts_type_element {
            TsTypeElement::TsCallSignatureDecl(_) => "call signature declaration".to_string(),
            TsTypeElement::TsConstructSignatureDecl(_) => "construct signature".to_string(),
            TsTypeElement::TsGetterSignature(_) => "getter signature".to_string(),
            TsTypeElement::TsSetterSignature(_) => "setter signature".to_string(),
            TsTypeElement::TsMethodSignature(_) => "method signature".to_string(),
            TsTypeElement::TsIndexSignature(_) => "index signature".to_string(),
            TsTypeElement::TsPropertySignature(_) => "property signature".to_string(),
        }
    }
}
