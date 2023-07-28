use std::ops::Deref;

use crate::{
    canister_method::{module::ModuleHelperMethods, AnnotatedFnDecl},
    ts_ast::Program,
    ts_ast::SourceMapped,
    Error,
};

pub trait GetAnnotatedFnDecls {
    fn get_annotated_fn_decls(&self) -> (Vec<SourceMapped<AnnotatedFnDecl>>, Vec<Error>);
}

impl GetAnnotatedFnDecls for Vec<Program> {
    fn get_annotated_fn_decls(&self) -> (Vec<SourceMapped<AnnotatedFnDecl>>, Vec<Error>) {
        self.iter().fold((vec![], vec![]), |acc, program| {
            let (fn_decls, errors) = program.get_annotated_fn_decls();

            (vec![acc.0, fn_decls].concat(), vec![acc.1, errors].concat())
        })
    }
}

impl Program {
    fn get_annotated_fn_decls(&self) -> (Vec<SourceMapped<AnnotatedFnDecl>>, Vec<Error>) {
        match self.deref() {
            swc_ecma_ast::Program::Module(module) => {
                module.get_annotated_fn_decls(&self.source_map, &self.alias_table, &self.alias_list)
            }
            swc_ecma_ast::Program::Script(_) => (vec![], vec![]),
        }
    }
}
