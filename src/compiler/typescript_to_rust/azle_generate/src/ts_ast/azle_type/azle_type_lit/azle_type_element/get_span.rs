use crate::ts_ast::ast_traits::GetSpan;

use super::AzleTypeElement;

impl GetSpan for AzleTypeElement<'_> {
    fn get_span(&self) -> swc_common::Span {
        match self {
            AzleTypeElement::AzlePropertySignature(azle_property_signature) => {
                azle_property_signature.ts_property_signature.span
            }
            AzleTypeElement::AzleMethodSignature(azle_method_signature) => {
                azle_method_signature.ts_method_signature.span
            }
        }
    }
}
