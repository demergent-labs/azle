use std::ops::Deref;
use swc_ecma_ast::{Decl, FnDecl, Module, ModuleDecl, ModuleItem, Stmt};

use crate::ts_ast::{Program, SourceMapped};

pub trait GetProgramFnDecls {
    fn get_fn_decls(&self) -> Vec<SourceMapped<FnDecl>>;
}

impl GetProgramFnDecls for Vec<Program> {
    fn get_fn_decls(&self) -> Vec<SourceMapped<FnDecl>> {
        self.iter()
            .flat_map(|azle_program| azle_program.get_fn_decls())
            .collect()
    }
}

impl Program {
    fn get_fn_decls(&self) -> Vec<SourceMapped<FnDecl>> {
        match self.deref() {
            swc_ecma_ast::Program::Module(module) => module.get_fn_decls(&self),
            swc_ecma_ast::Program::Script(_) => vec![],
        }
    }
}

pub trait GetModuleFnDecls {
    fn get_fn_decls<'a>(&'a self, parent: &'a Program) -> Vec<SourceMapped<'a, FnDecl>>;
}

impl GetModuleFnDecls for Module {
    fn get_fn_decls<'a>(&'a self, parent: &'a Program) -> Vec<SourceMapped<'a, FnDecl>> {
        self.body
            .iter()
            .filter_map(|module_item| module_item.as_decl())
            .filter_map(|decl| decl.as_fn_decl())
            .filter_map(|fn_decl| {
                Some(SourceMapped::new(
                    fn_decl,
                    &parent.source_map,
                    &parent.symbol_table,
                ))
            })
            .collect()
    }
}

trait AsDecl {
    fn as_decl(&self) -> Option<&Decl>;
}

impl AsDecl for ModuleItem {
    fn as_decl(&self) -> Option<&Decl> {
        match self {
            ModuleItem::ModuleDecl(decl) => match decl {
                ModuleDecl::ExportDecl(export_decl) => Some(&export_decl.decl),
                _ => None,
            },
            ModuleItem::Stmt(stmt) => match stmt {
                Stmt::Decl(decl) => Some(decl),
                _ => None,
            },
        }
    }
}
