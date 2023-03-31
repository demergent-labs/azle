use swc_common::SourceMap;
use swc_ecma_ast::{Decl, ExportDecl, FnDecl, Module, ModuleDecl, ModuleItem, Stmt};

use crate::{
    canister_method::{errors, module_item::ModuleItemHelperMethods, AnnotatedFnDecl, Annotation},
    ts_ast::{source_map::SourceMapped, AzleTypeAliasDecl},
};

pub trait ModuleHelperMethods {
    fn get_annotated_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<AnnotatedFnDecl>;
    fn get_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<SourceMapped<'a, FnDecl>>;
    fn get_export_decls(&self) -> Vec<ExportDecl>;
    fn get_azle_type_alias_decls<'a>(&'a self, source_map: &'a SourceMap)
        -> Vec<AzleTypeAliasDecl>;
}

impl ModuleHelperMethods for Module {
    fn get_annotated_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<AnnotatedFnDecl> {
        // TODO: Consider changing this algorithm from being backward looking
        // to being forward looking

        let mut previous_module_item_was_custom_decorator = false;

        self.body
            .iter()
            .enumerate()
            .fold(vec![], |mut acc, (i, module_item)| {
                if previous_module_item_was_custom_decorator {
                    let custom_decorator_module_item = self.body.get(i - 1).unwrap();

                    match module_item.as_exported_fn_decl() {
                        Some(fn_decl) => {
                            let annotation =
                                match Annotation::from_module_item(custom_decorator_module_item) {
                                    Ok(annotation) => annotation,
                                    Err(err) => panic!(
                                        "{}",
                                        errors::build_parse_error_message(
                                            err,
                                            custom_decorator_module_item,
                                            source_map
                                        )
                                    ),
                                };

                            if fn_decl.function.return_type.is_none() {
                                panic!(
                                    "{}",
                                    errors::build_missing_return_type_error_message(
                                        &fn_decl, source_map
                                    )
                                )
                            }

                            acc.push(AnnotatedFnDecl {
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
