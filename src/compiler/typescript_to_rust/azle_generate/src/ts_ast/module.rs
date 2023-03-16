use swc_common::SourceMap;
use swc_ecma_ast::{ClassDecl, Decl, ExportDecl, Expr, Module, ModuleDecl, ModuleItem, Stmt};

use super::{AzleFnDecl, AzleTypeAliasDecl, GetName};
use crate::{
    canister_method::errors,
    ts_ast::{module_item::ModuleItemHelperMethods, source_map::SourceMapped},
};

pub trait ModuleHelperMethods {
    fn get_azle_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<AzleFnDecl>;
    fn get_export_decls(&self) -> Vec<ExportDecl>;
    fn get_azle_type_alias_decls<'a>(&'a self, source_map: &'a SourceMap)
        -> Vec<AzleTypeAliasDecl>;
    fn get_external_canister_class_declarations<'a>(
        &'a self,
        source_map: &'a SourceMap,
    ) -> Vec<SourceMapped<ClassDecl>>;
}

impl ModuleHelperMethods for Module {
    fn get_azle_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<AzleFnDecl> {
        let mut previous_module_item_was_custom_decorator = false;

        self.body
            .iter()
            .enumerate()
            .fold(vec![], |mut acc, (i, module_item)| {
                if previous_module_item_was_custom_decorator {
                    let custom_decorator_module_item = self.body.get(i - 1).unwrap();

                    let exported_fn_decl_option = module_item.as_exported_fn_decl();

                    match exported_fn_decl_option {
                        Some(fn_decl) => {
                            let annotation = match custom_decorator_module_item
                                .to_canister_method_annotation()
                            {
                                Some(annotation) => annotation,
                                None => panic!("Unable to parse a custom azle decorator"),
                            };
                            acc.push(AzleFnDecl {
                                annotation,
                                fn_decl,
                                source_map,
                            })
                        }
                        None => panic!(
                            "{}",
                            errors::build_extraneous_decorator_error_message(
                                custom_decorator_module_item,
                                source_map
                            )
                        ),
                    }
                }

                if i + 1 == self.body.len() && module_item.is_custom_decorator() {
                    panic!(
                        "{}",
                        errors::build_extraneous_decorator_error_message(module_item, source_map)
                    )
                }

                previous_module_item_was_custom_decorator = module_item.is_custom_decorator();
                acc
            })
    }

    fn get_export_decls(&self) -> Vec<ExportDecl> {
        let module_decls: Vec<ModuleDecl> = self
            .body
            .iter()
            .filter(|module_item| module_item.is_module_decl())
            .map(|module_item| module_item.as_module_decl().unwrap().clone())
            .collect();

        let export_decls: Vec<ExportDecl> = module_decls
            .iter()
            .filter(|module_decl| module_decl.is_export_decl())
            .map(|module_decl| module_decl.as_export_decl().unwrap().clone())
            .collect();

        export_decls
    }

    fn get_azle_type_alias_decls<'a>(
        &'a self,
        source_map: &'a SourceMap,
    ) -> Vec<AzleTypeAliasDecl> {
        let module_stmts: Vec<Stmt> = self
            .body
            .iter()
            .filter(|module_item| module_item.is_stmt())
            .map(|module_item| module_item.as_stmt().unwrap().clone())
            .collect();

        let stmt_azle_type_alias_decls: Vec<AzleTypeAliasDecl> = module_stmts
            .iter()
            .filter(|module_stmt| module_stmt.is_decl())
            .map(|module_decl| module_decl.as_decl().unwrap().clone())
            .filter(|decl| decl.is_ts_type_alias())
            .map(|decl| AzleTypeAliasDecl {
                ts_type_alias_decl: decl.as_ts_type_alias().unwrap().clone(),
                source_map,
            })
            .collect();

        let export_decls: Vec<ExportDecl> = self
            .body
            .iter()
            .filter(|module_item| module_item.is_module_decl())
            .map(|module_item| module_item.as_module_decl().unwrap().clone())
            .filter(|module_decl| module_decl.is_export_decl())
            .map(|module_decl| module_decl.as_export_decl().unwrap().clone())
            .collect();

        let export_azle_type_alias_decls: Vec<AzleTypeAliasDecl> = export_decls
            .iter()
            .filter(|export_decl| export_decl.decl.is_ts_type_alias())
            .map(|export_decl| AzleTypeAliasDecl {
                ts_type_alias_decl: export_decl.decl.as_ts_type_alias().unwrap().clone(),
                source_map,
            })
            .collect();

        vec![stmt_azle_type_alias_decls, export_azle_type_alias_decls].concat()
    }

    fn get_external_canister_class_declarations<'a>(
        &'a self,
        source_map: &'a SourceMap,
    ) -> Vec<SourceMapped<ClassDecl>> {
        self.body.iter().fold(vec![], |mut acc, module_item| {
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
                        if let Expr::Ident(ident) = &**super_class {
                            if ident.get_name() == "ExternalCanister" {
                                acc.push(SourceMapped::new(class_decl, source_map))
                            }
                        }
                    }
                }
            }

            acc
        })
    }
}
