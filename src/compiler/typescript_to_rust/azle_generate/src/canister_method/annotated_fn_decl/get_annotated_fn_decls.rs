use cdk_framework::act::node::canister_method::CanisterMethodType;
use std::ops::Deref;

use crate::{
    canister_method::{module::ModuleHelperMethods, AnnotatedFnDecl},
    ts_ast::Program,
};

pub trait GetAnnotatedFnDecls {
    fn get_annotated_fn_decls(&self) -> Vec<AnnotatedFnDecl>;
    fn get_annotated_fn_decls_of_type(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<AnnotatedFnDecl>;
}

impl GetAnnotatedFnDecls for Vec<Program> {
    fn get_annotated_fn_decls_of_type(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<AnnotatedFnDecl> {
        self.get_annotated_fn_decls()
            .into_iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(canister_method_type.clone())
            })
            .collect()
    }

    fn get_annotated_fn_decls(&self) -> Vec<AnnotatedFnDecl> {
        self.iter()
            .flat_map(|program| program.get_annotated_fn_decls())
            .collect()
    }
}

impl Program {
    fn get_annotated_fn_decls(&self) -> Vec<AnnotatedFnDecl> {
        match self.deref() {
            swc_ecma_ast::Program::Module(module) => {
                module.get_annotated_fn_decls(&self.source_map)
            }
            swc_ecma_ast::Program::Script(_) => vec![],
        }
    }
}
