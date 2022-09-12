use swc_ecma_ast::{Module, Program, TsTypeAliasDecl};

use crate::generators::canister_methods::{
    get_ast_type_alias_decls_by_type_ref_name, get_type_alias_decls,
};

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
    // TODO should we have this take a Vec<TsTypeAliasDecl> so its more like the other ones like it in mod.rs and we should all put them in the same place, probably here.
    let decls = get_type_alias_decls(module);
    get_ast_type_alias_decls_by_type_ref_name(&decls, "Func")
}
