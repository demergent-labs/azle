use swc_ecma_ast::{Module, Program, Stmt, TsTypeAliasDecl};

// TODO: This may grab unintended Func declarations. Instead traverse starting
// from the exported canister methods.
pub fn get_ast_func_type_alias_decls_from_programs(
    programs: &Vec<Program>,
) -> Vec<TsTypeAliasDecl> {
    programs.iter().fold(vec![], |acc, program| {
        let ast_func_type_alias_decls = get_ast_func_type_alias_decls_from_program(program);

        vec![acc, ast_func_type_alias_decls].concat()
    })
}

pub fn get_ast_func_type_alias_decls_from_program(program: &Program) -> Vec<TsTypeAliasDecl> {
    match program {
        Program::Module(module) => get_ast_func_type_alias_decls(module),
        Program::Script(_) => vec![],
    }
}

fn get_ast_func_type_alias_decls(module: &Module) -> Vec<TsTypeAliasDecl> {
    let module_statements: Vec<Stmt> = module
        .body
        .iter()
        .filter(|module_item| module_item.is_stmt())
        .map(|module_item| module_item.as_stmt().unwrap().clone())
        .collect();

    let func_type_alias_decl: Vec<TsTypeAliasDecl> = module_statements
        .iter()
        .filter(|module_stmt| module_stmt.is_decl())
        .map(|module_stmt| module_stmt.as_decl().unwrap().clone())
        .filter(|decl| decl.is_ts_type_alias())
        .map(|decl| decl.as_ts_type_alias().unwrap().clone())
        .filter(|ts_type_alias_decl| {
            ts_type_alias_decl.type_ann.is_ts_type_ref()
                && match ts_type_alias_decl.type_ann.as_ts_type_ref() {
                    Some(ts_type_ref) => match ts_type_ref.type_name.as_ident() {
                        Some(ident) => ident.sym.chars().as_str() == "Func",
                        None => false,
                    },
                    None => false,
                }
        })
        .collect();

    func_type_alias_decl
}
