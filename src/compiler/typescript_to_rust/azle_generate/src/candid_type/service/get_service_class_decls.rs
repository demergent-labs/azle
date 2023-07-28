use std::ops::Deref;
use swc_common::SourceMap;
use swc_ecma_ast::{ClassDecl, Decl, Module, ModuleDecl, ModuleItem, Stmt};

use crate::{
    traits::GetOptionalName,
    ts_ast::{Program, SourceMapped},
    AliasTable,
};

pub trait GetFlattenedServiceClassDecls {
    fn get_service_class_declarations(&self) -> Vec<SourceMapped<ClassDecl>>;
}

impl GetFlattenedServiceClassDecls for Vec<Program> {
    fn get_service_class_declarations(&self) -> Vec<SourceMapped<ClassDecl>> {
        self.into_iter()
            .flat_map(|program| program.get_service_class_declarations())
            .collect()
    }
}

impl Program {
    fn get_service_class_declarations(&self) -> Vec<SourceMapped<ClassDecl>> {
        match self.deref() {
            swc_ecma_ast::Program::Module(module) => module.get_service_class_declarations(
                &self.source_map,
                &self.alias_table,
                &self.alias_list,
            ),
            swc_ecma_ast::Program::Script(_) => vec![],
        }
    }
}

trait GetServiceClassDecls {
    fn get_service_class_declarations<'a>(
        &'a self,
        source_map: &'a SourceMap,
        alias_table: &'a AliasTable,
        alias_list: &'a Vec<String>,
    ) -> Vec<SourceMapped<ClassDecl>>;
}

impl GetServiceClassDecls for Module {
    fn get_service_class_declarations<'a>(
        &'a self,
        source_map: &'a SourceMap,
        alias_table: &'a AliasTable,
        alias_list: &'a Vec<String>,
    ) -> Vec<SourceMapped<ClassDecl>> {
        self.body.iter().fold(vec![], |mut acc, module_item| {
            // acc is mut because SourceMapped<FnDecl> can't be cloned, which is
            // necessary to do something like:
            // return vec![acc, vec![SourceMapped::new(class_decl, source_map)]].concat();

            let decl_opt = match module_item {
                ModuleItem::ModuleDecl(decl) => match decl {
                    ModuleDecl::ExportDecl(export_decl) => Some(&export_decl.decl),
                    _ => None,
                },
                ModuleItem::Stmt(stmt) => match stmt {
                    Stmt::Decl(decl) => Some(decl),
                    _ => None,
                },
            };

            if let Some(decl) = decl_opt {
                if let Decl::Class(class_decl) = decl {
                    if let Some(super_class) = &class_decl.class.super_class {
                        if let Some(name) = super_class.get_name() {
                            if alias_table.service.contains(&name) {
                                acc.push(SourceMapped::new(
                                    class_decl,
                                    source_map,
                                    alias_table,
                                    alias_list,
                                ))
                            }
                        }
                    }
                }
            }

            acc
        })
    }
}
