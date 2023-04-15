use swc_common::SourceMap;
use swc_ecma_ast::{Decl, FnDecl, Module, ModuleDecl, ModuleItem, Program, Stmt};

use crate::ts_ast::{AzleProgram, SourceMapped};

pub trait GetProgramFnDecls {
    fn get_fn_decls(&self) -> Vec<SourceMapped<FnDecl>>;
}

impl GetProgramFnDecls for Vec<AzleProgram> {
    fn get_fn_decls(&self) -> Vec<SourceMapped<FnDecl>> {
        self.iter().fold(vec![], |mut acc, azle_program| {
            // acc is mut because SourceMapped<FnDecl> can't be cloned, which is
            // necessary to do something like:
            // vec![acc, vec![azle_program.get_fn_decls()]].concat()

            acc.extend(azle_program.get_fn_decls());
            acc
        })
    }
}

impl AzleProgram {
    fn get_fn_decls(&self) -> Vec<SourceMapped<FnDecl>> {
        match &self.program {
            Program::Module(module) => module.get_fn_decls(&self.source_map),
            Program::Script(_) => vec![],
        }
    }
}

pub trait GetModuleFnDecls {
    fn get_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<SourceMapped<'a, FnDecl>>;
}

impl GetModuleFnDecls for Module {
    fn get_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<SourceMapped<'a, FnDecl>> {
        self.body
            .iter()
            .fold(vec![], |mut acc, module_item| match module_item.as_decl() {
                Some(decl) => match decl {
                    Decl::Fn(fn_decl) => {
                        // acc is mut because SourceMapped<FnDecl> can't be cloned, which is
                        // necessary to do something like:
                        // vec![acc, vec![SourceMapped::new(&fn_decl, source_map)]].concat()

                        acc.push(SourceMapped::new(&fn_decl, source_map));
                        acc
                    }
                    _ => acc,
                },
                None => acc,
            })
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
