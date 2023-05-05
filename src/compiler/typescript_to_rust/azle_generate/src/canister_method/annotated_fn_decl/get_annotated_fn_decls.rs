use std::ops::Deref;

use crate::{
    canister_method::{module::ModuleHelperMethods, AnnotatedFnDecl},
    ts_ast::Program,
};

pub trait GetAnnotatedFnDecls {
    fn get_annotated_fn_decls(&self) -> Vec<AnnotatedFnDecl>;
}

impl GetAnnotatedFnDecls for Vec<Program> {
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
