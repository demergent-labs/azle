use swc_ecma_ast::TsTypeElement;

use super::AzleTypeElement;
use crate::ts_ast::ast_traits::TypeToString;

impl TypeToString for AzleTypeElement<'_> {
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
