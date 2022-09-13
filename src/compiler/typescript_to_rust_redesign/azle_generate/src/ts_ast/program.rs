use swc_ecma_ast::{FnDecl, Program};

use super::{fn_decl::is_canister_method_type_fn_decl, module::get_export_decls};
use crate::azle_ast::CanisterMethodType;

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
