use swc_common::SourceMap;
use swc_ecma_ast::{ExportDecl, Module, ModuleDecl, Stmt};

use crate::ts_ast::module_item::ModuleItemHelperMethods;

use super::{AzleFnDecl, AzleTypeAliasDecl};

pub trait ModuleHelperMethods {
    fn get_azle_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<AzleFnDecl>;
    fn get_export_decls(&self) -> Vec<ExportDecl>;
    fn get_azle_type_alias_decls<'a>(&'a self, source_map: &'a SourceMap)
        -> Vec<AzleTypeAliasDecl>;
}

impl ModuleHelperMethods for Module {
    fn get_azle_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<AzleFnDecl> {
        let mut previous_module_item_was_custom_decorator = false;

        self.body
            .iter()
            .enumerate()
            .fold(vec![], |mut acc, (i, module_item)| {
                if previous_module_item_was_custom_decorator {
                    let custom_decorator_expr_stmt =
                        self.body.get(i - 1).unwrap().as_expr_stmt().unwrap();

                    let exported_fn_decl_option = module_item.as_exported_fn_decl();

                    match exported_fn_decl_option {
                        Some(exported_fn_decl) => acc.push(AzleFnDecl {
                            custom_decorator: custom_decorator_expr_stmt,
                            fn_decl: exported_fn_decl,
                            source_map,
                        }),
                        // TODO: improve this error message
                        None => panic!("All custom decorators must be immediately followed by an exported function declaration"),
                    }
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
}
