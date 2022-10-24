use super::AzleTypeElement;
use crate::ts_ast::ast_traits::GetSourceInfo;

impl GetSourceInfo for AzleTypeElement<'_> {
    fn get_source(&self) -> String {
        match self {
            AzleTypeElement::AzlePropertySignature(azle_property_signature) => {
                azle_property_signature.get_source()
            }
            AzleTypeElement::AzleMethodSignature(azle_method_signature) => {
                azle_method_signature.get_source()
            }
        }
    }

    fn get_line_number(&self) -> usize {
        match self {
            AzleTypeElement::AzlePropertySignature(azle_property_signature) => {
                azle_property_signature.get_line_number()
            }
            AzleTypeElement::AzleMethodSignature(azle_method_signature) => {
                azle_method_signature.get_line_number()
            }
        }
    }

    fn get_origin(&self) -> String {
        match self {
            AzleTypeElement::AzlePropertySignature(azle_property_signature) => {
                azle_property_signature.get_origin()
            }
            AzleTypeElement::AzleMethodSignature(azle_method_signature) => {
                azle_method_signature.get_origin()
            }
        }
    }

    fn get_range(&self) -> (usize, usize) {
        match self {
            AzleTypeElement::AzlePropertySignature(azle_property_signature) => {
                azle_property_signature.get_range()
            }
            AzleTypeElement::AzleMethodSignature(azle_method_signature) => {
                azle_method_signature.get_range()
            }
        }
    }
}
