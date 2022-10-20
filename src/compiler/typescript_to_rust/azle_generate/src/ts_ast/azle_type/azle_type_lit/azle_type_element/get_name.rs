use crate::ts_ast::GetName;

use super::AzleTypeElement;

impl GetName for AzleTypeElement<'_> {
    fn get_name(&self) -> &str {
        match &self.ts_type_element {
            swc_ecma_ast::TsTypeElement::TsPropertySignature(ts_property_signature) => {
                ts_property_signature.get_name()
            }
            _ => panic!("{}", self.unsupported_member_error()),
        }
    }
}
