use super::AzleTypeElement;
use crate::ts_ast::GetSourceText;

impl GetSourceText for AzleTypeElement<'_> {
    fn get_source_text(&self) -> String {
        match self {
            AzleTypeElement::AzlePropertySignature(azle_property_signature) => {
                azle_property_signature.get_source_text()
            }
            AzleTypeElement::AzleMethodSignature(_) => todo!(),
        }
    }
}
