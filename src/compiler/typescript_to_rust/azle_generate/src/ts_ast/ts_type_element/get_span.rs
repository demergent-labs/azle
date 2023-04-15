use swc_common::Span;
use swc_ecma_ast::TsTypeElement;

use crate::traits::GetSpan;

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
