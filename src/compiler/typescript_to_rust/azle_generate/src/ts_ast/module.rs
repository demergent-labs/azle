use swc_common::SourceMap;
use swc_ecma_ast::{ExportDecl, Module, ModuleDecl, ModuleItem, Stmt};

use super::{source_map::GetSourceFileInfo, AzleFnDecl, AzleTypeAliasDecl};
use crate::{
    errors::{ErrorMessage, Suggestion},
    ts_ast::module_item::ModuleItemHelperMethods,
};

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
                    let custom_decorator_module_item = self.body.get(i - 1).unwrap();

                    let exported_fn_decl_option = module_item.as_exported_fn_decl();

                    match exported_fn_decl_option {
                        Some(exported_fn_decl) => acc.push(AzleFnDecl {
                            annotation: custom_decorator_module_item
                                .to_canister_method_annotation()
                                .unwrap(),
                            fn_decl: exported_fn_decl,
                            source_map,
                        }),
                        None => panic!(
                            "{}",
                            build_extraneous_decorator_error_message(
                                custom_decorator_module_item,
                                source_map
                            )
                        ),
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

fn build_extraneous_decorator_error_message(
    custom_decorator_module_item: &ModuleItem,
    source_map: &SourceMap,
) -> ErrorMessage {
    let custom_decorator_expr_stmt = custom_decorator_module_item.as_expr_stmt().unwrap();
    let span = custom_decorator_expr_stmt.span;
    let annotation_type = custom_decorator_module_item
        .to_canister_method_annotation()
        .unwrap()
        .kind;
    let range = source_map.get_range(span);
    let example_function_declaration =
        "export function some_canister_method() {\n  // method body\n}";

    ErrorMessage {
        title: format!("extraneous {} annotation", annotation_type),
        origin: source_map.get_origin(span),
        line_number: source_map.get_line_number(span),
        source: source_map.get_source(span),
        range,
        annotation: "expected this to be followed by an exported function declaration".to_string(),
        suggestion: Some(Suggestion {
            title: "Follow it with an exported function declaration or remove it. E.g.:"
                .to_string(),
            source: format!(
                "{}\n{}",
                source_map.get_source(span),
                example_function_declaration
            ),
            range: (range.1 + 1, range.1 + example_function_declaration.len()),
            annotation: None,
            import_suggestion: None,
        }),
    }
}
