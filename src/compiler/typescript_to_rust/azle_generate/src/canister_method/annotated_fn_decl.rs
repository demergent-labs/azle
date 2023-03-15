use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_common::SourceMap;
use swc_ecma_ast::FnDecl;

use crate::canister_method_annotation::CanisterMethodAnnotation;

#[derive(Clone)]
pub struct AnnotatedFnDecl<'a> {
    pub annotation: CanisterMethodAnnotation,
    pub fn_decl: FnDecl,
    pub source_map: &'a SourceMap,
}

impl AnnotatedFnDecl<'_> {
    pub fn is_canister_method_type(&self, canister_method_type: CanisterMethodType) -> bool {
        self.annotation.method_type == canister_method_type
    }
}
