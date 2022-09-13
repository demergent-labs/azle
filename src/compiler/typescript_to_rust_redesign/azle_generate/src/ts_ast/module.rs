use swc_ecma_ast::{ExportDecl, Module, ModuleDecl, TsTypeAliasDecl};

use crate::generators::canister_methods::{
    get_ast_type_alias_decls_by_type_ref_name, get_type_alias_decls,
};

pub fn get_export_decls(module: &Module) -> Vec<ExportDecl> {
    let module_decls: Vec<ModuleDecl> = module
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

pub fn get_ast_func_type_alias_decls(module: &Module) -> Vec<TsTypeAliasDecl> {
    // TODO should we have this take a Vec<TsTypeAliasDecl> so its more like the other ones like it in mod.rs and we should all put them in the same place, probably here.
    let decls = get_type_alias_decls(module);
    get_ast_type_alias_decls_by_type_ref_name(&decls, "Func")
}
