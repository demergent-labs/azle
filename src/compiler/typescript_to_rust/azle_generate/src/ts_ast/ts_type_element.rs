use swc_ecma_ast::{TsType, TsTypeElement};

use super::{ast_traits::GetTsType, GetName};

impl GetName for TsTypeElement {
    fn get_name(&self) -> &str {
        match self {
            TsTypeElement::TsCallSignatureDecl(_) => todo!(),
            TsTypeElement::TsConstructSignatureDecl(_) => todo!(),
            TsTypeElement::TsPropertySignature(prop_sig) => prop_sig.get_name(),
            TsTypeElement::TsGetterSignature(getter_sig) => getter_sig.get_name(),
            TsTypeElement::TsSetterSignature(setter_sig) => setter_sig.get_name(),
            TsTypeElement::TsMethodSignature(method_sig) => method_sig.get_name(),
            TsTypeElement::TsIndexSignature(index_sig) => index_sig.get_name(),
        }
    }
}

impl GetTsType for TsTypeElement {
    fn get_ts_type(&self) -> TsType {
        match self {
            TsTypeElement::TsCallSignatureDecl(_) => todo!(),
            TsTypeElement::TsConstructSignatureDecl(_) => todo!(),
            TsTypeElement::TsPropertySignature(prop_sig) => prop_sig.get_ts_type(),
            TsTypeElement::TsGetterSignature(_) => todo!(),
            TsTypeElement::TsSetterSignature(_) => todo!(),
            TsTypeElement::TsMethodSignature(_) => todo!(),
            TsTypeElement::TsIndexSignature(_) => todo!(),
        }
    }
}
