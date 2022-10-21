use swc_ecma_ast::TsType;

use super::AzleTypeElement;
use crate::ts_ast::GetTsType;

impl GetTsType for AzleTypeElement<'_> {
    fn get_ts_type(&self) -> TsType {
        match &self.ts_type_element {
            swc_ecma_ast::TsTypeElement::TsPropertySignature(ts_property_signature) => {
                ts_property_signature.get_ts_type()
            }
            _ => panic!("{}", self.unsupported_member_error()),
        }
    }
}
