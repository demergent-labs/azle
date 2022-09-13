use swc_ecma_ast::{FnDecl, Program, TsTypeAliasDecl};

use super::{
    fn_decl::is_canister_method_type_fn_decl, module, module::get_export_decls,
    ts_type_alias_decl::is_type_alias_decl_system_structure_type,
};
use crate::{
    azle_ast::{CanisterMethodType, SystemStructureType},
    generators::canister_methods::get_ast_type_alias_decls_from_programs,
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
        Program::Module(module) => module::get_ast_func_type_alias_decls(module),
        Program::Script(_) => vec![],
    }
}

pub fn get_canister_method_type_fn_decls(
    programs: &Vec<Program>,
    canister_method_type: &CanisterMethodType,
) -> Vec<FnDecl> {
    let fn_decls = get_ast_fn_decls_from_programs(programs);

    fn_decls
        .into_iter()
        .filter(|fn_decl| is_canister_method_type_fn_decl(fn_decl, canister_method_type))
        .collect()
}

fn get_ast_fn_decls_from_programs(programs: &Vec<Program>) -> Vec<FnDecl> {
    programs.iter().fold(vec![], |acc, program| {
        let ast_fn_decls = get_ast_fn_decls_from_program(program);

        vec![acc, ast_fn_decls].concat()
    })
}

fn get_ast_fn_decls_from_program(program: &Program) -> Vec<FnDecl> {
    match program {
        Program::Module(module) => {
            let export_decls = get_export_decls(module);

            let fn_decls: Vec<FnDecl> = export_decls
                .iter()
                .filter(|export_decl| export_decl.decl.is_fn_decl())
                .map(|export_decl| export_decl.decl.as_fn_decl().unwrap().clone())
                .collect();

            fn_decls
        }
        Program::Script(_) => {
            vec![]
        }
    }
}

pub fn get_type_alias_decls_for_system_structure_type(
    programs: &Vec<Program>,
    system_structure_type: &SystemStructureType,
) -> Vec<TsTypeAliasDecl> {
    let type_alias_decls = get_ast_type_alias_decls_from_programs(programs);

    type_alias_decls
        .into_iter()
        .filter(|type_alias_decl| {
            is_type_alias_decl_system_structure_type(type_alias_decl, system_structure_type)
        })
        .collect()
}
