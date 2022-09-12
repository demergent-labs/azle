use swc_ecma_ast::{Id, Program, TsEntityName, TsType, TsTypeAliasDecl};

use crate::generators::canister_methods::get_ast_type_alias_decls_from_programs;

use super::ident::ident_to_string;

pub enum SystemStructureType {
    Canister,
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

fn is_type_alias_decl_system_structure_type(
    type_alias_decl: &TsTypeAliasDecl,
    system_structure_type: &SystemStructureType,
) -> bool {
    // let type_alias_decl
    match system_structure_type {
        SystemStructureType::Canister => {
            let type_reference_name_option =
                get_identifier_name_for_ts_type(&*type_alias_decl.type_ann);

            match type_reference_name_option {
                Some(type_reference_name) => type_reference_name == "Canister",
                None => false,
            }
        }
    }
}

pub fn get_type_alias_decl_name(ts_type_alias_decl: &TsTypeAliasDecl) -> String {
    ident_to_string(&ts_type_alias_decl.id)
}

// TODO move to a ts_type.rs file in utils
fn get_identifier_name_for_ts_type(ts_type: &TsType) -> Option<String> {
    match ts_type {
        TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
            TsEntityName::Ident(ident) => Some(ident_to_string(&ident)),
            _ => None,
        },
        _ => None,
    }
}
