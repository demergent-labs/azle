use swc_ecma_ast::{ExportDecl, Module, ModuleDecl, Stmt, TsTypeAliasDecl};

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

pub fn get_type_alias_decls(module: &Module) -> Vec<TsTypeAliasDecl> {
    let module_stmts: Vec<Stmt> = module
        .body
        .iter()
        .filter(|module_item| module_item.is_stmt())
        .map(|module_item| module_item.as_stmt().unwrap().clone())
        .collect();

    let type_alias_decls: Vec<TsTypeAliasDecl> = module_stmts
        .iter()
        .filter(|module_stmt| module_stmt.is_decl())
        .map(|module_decl| module_decl.as_decl().unwrap().clone())
        .filter(|decl| decl.is_ts_type_alias())
        .map(|decl| decl.as_ts_type_alias().unwrap().clone())
        .collect();

    let export_decls: Vec<ExportDecl> = module
        .body
        .iter()
        .filter(|module_item| module_item.is_module_decl())
        .map(|module_item| module_item.as_module_decl().unwrap().clone())
        .filter(|module_decl| module_decl.is_export_decl())
        .map(|module_decl| module_decl.as_export_decl().unwrap().clone())
        .collect();

    let export_type_alias_decls: Vec<TsTypeAliasDecl> = export_decls
        .iter()
        .filter(|export_decl| export_decl.decl.is_ts_type_alias())
        .map(|export_decl| export_decl.decl.as_ts_type_alias().unwrap().clone())
        .collect();

    vec![type_alias_decls, export_type_alias_decls].concat()
}
