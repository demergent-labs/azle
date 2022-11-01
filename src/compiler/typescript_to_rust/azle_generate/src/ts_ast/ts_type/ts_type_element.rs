use swc_common::Span;
use swc_ecma_ast::TsTypeElement;

use crate::ts_ast::ast_traits::GetSpan;
use crate::ts_ast::ast_traits::TypeToString;

impl GetSpan for TsTypeElement {
    fn get_span(&self) -> Span {
        match self {
            TsTypeElement::TsCallSignatureDecl(ts_call_signature_decl) => {
                ts_call_signature_decl.span
            }
            TsTypeElement::TsConstructSignatureDecl(ts_construct_signature_decl) => {
                ts_construct_signature_decl.span
            }
            TsTypeElement::TsPropertySignature(ts_property_signature) => ts_property_signature.span,
            TsTypeElement::TsGetterSignature(ts_getter_signature) => ts_getter_signature.span,
            TsTypeElement::TsSetterSignature(ts_setter_signature) => ts_setter_signature.span,
            TsTypeElement::TsMethodSignature(ts_method_signature) => ts_method_signature.span,
            TsTypeElement::TsIndexSignature(ts_index_signature) => ts_index_signature.span,
        }
    }
}

impl TypeToString for TsTypeElement {
    fn type_to_string(&self) -> String {
        match &self {
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
