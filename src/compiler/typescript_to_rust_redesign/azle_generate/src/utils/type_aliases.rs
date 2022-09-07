use swc_ecma_ast::{Program, TsTypeAliasDecl};

use crate::generators::canister_methods::get_ast_type_alias_decls_from_programs;

pub enum SystemStructureType {
    Canister,
    Stable,
}

pub fn get_type_alias_decls_for_system_structure_type(
    programs: &Vec<Program>,
    system_structure_type: &SystemStructureType,
) -> Vec<TsTypeAliasDecl> {
    let type_alias_decls = get_ast_type_alias_decls_from_programs(programs);

    vec![]
}

fn is_type_alias_decl_system_structure_type(
    type_alias_decl: &TsTypeAliasDecl,
    system_structure_type: &SystemStructureType,
) -> bool {
    false
}
