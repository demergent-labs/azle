use swc_ecma_ast::TsTypeElement;

use super::AzleTypeElement;
use crate::{
    errors::ErrorMessage,
    ts_ast::{
        ast_traits::{GetSourceInfo, GetSpan},
        source_map::GetSourceFileInfo,
        GetSourceText,
    },
};

impl AzleTypeElement<'_> {
    pub(super) fn unsupported_member_error(&self) -> ErrorMessage {
        match &self.ts_type_element {
            TsTypeElement::TsCallSignatureDecl(_) => self.member_not_supported_error(),
            TsTypeElement::TsConstructSignatureDecl(_) => self.member_not_supported_error(),
            TsTypeElement::TsGetterSignature(_) => self.member_not_supported_error(),
            TsTypeElement::TsSetterSignature(_) => self.member_not_supported_error(),
            TsTypeElement::TsMethodSignature(_) => self.member_not_supported_error(),
            TsTypeElement::TsIndexSignature(_) => self.member_not_supported_error(),
            _ => panic!("Unreachable: {} is supported", self.get_source_text()),
        }
    }

    fn member_not_supported_error(&self) -> ErrorMessage {
        ErrorMessage {
            title: "Unsupported Type".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: format!(
                "{} is not a supported type",
                self.source_map.get_text(self.ts_type_element.get_span())
            ),
            suggestion: None,
        }
    }
}
