use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
};
use swc_ecma_ast::{TsEntityName, TsType, TsTypeAliasDecl};

use super::{
    ident::ident_to_string,
    ts_method_signature::{get_param_ts_types_from_method, get_return_ts_type_from_method},
    ts_type::get_dependent_types_for_ts_type,
};
use crate::azle_ast::SystemStructureType;

pub fn get_dependent_types_from_type_alias_decl(
    type_alias_decl: &TsTypeAliasDecl,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    get_dependent_types_for_ts_type(&*type_alias_decl.type_ann, type_alias_lookup, found_types)
}

pub fn get_dependent_types_from_canister_decls(
    canister_decls: &Vec<TsTypeAliasDecl>,
    possible_dependencies: &Vec<TsTypeAliasDecl>,
) -> HashSet<String> {
    canister_decls
        .iter()
        .fold(HashSet::new(), |acc, canister_decl| {
            acc.union(&get_dependent_types_from_canister_decl(
                canister_decl,
                possible_dependencies,
                &acc,
            ))
            .cloned()
            .collect()
        })
}

fn get_dependent_types_from_canister_decl(
    canister_decl: &TsTypeAliasDecl,
    possible_dependencies: &Vec<TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> HashSet<String> {
    let type_alias_lookup = generate_hash_map(possible_dependencies);

    // Verify that it is a canister
    let is_canister = canister_decl.type_ann.is_ts_type_ref()
        && canister_decl
            .type_ann
            .as_ts_type_ref()
            .unwrap()
            .type_name
            .as_ident()
            .unwrap()
            .sym
            .chars()
            .as_str()
            == "Canister";
    if !is_canister {
        panic!("Expecting Canister")
    }
    // Get the tstypeliteral out of it
    let ts_type_lit = &*canister_decl
        .type_ann
        .as_ts_type_ref()
        .unwrap()
        .type_params
        .as_ref()
        .unwrap()
        .params[0];
    let ts_type_lit = ts_type_lit.as_ts_type_lit().unwrap();

    // Look at the members
    // Make sure that all of the members are tsMethodSignators and not tsPropertySignatures
    let ts_types = ts_type_lit
        .members
        .iter()
        .fold(vec![], |acc, member| match member {
            swc_ecma_ast::TsTypeElement::TsMethodSignature(method_sig) => {
                let return_types = get_return_ts_type_from_method(method_sig);
                let param_types = get_param_ts_types_from_method(method_sig);
                vec![acc, vec![return_types], param_types].concat()
            }
            _ => todo!("There should only be Method Signatures on a Canister type?"),
        });

    // Get the goods out of a method signature
    ts_types.iter().fold(found_types.clone(), |acc, ts_type| {
        let result = HashSet::from_iter(
            get_dependent_types_for_ts_type(ts_type, &type_alias_lookup, &acc)
                .iter()
                .cloned(),
        );
        acc.union(&result).cloned().collect()
    })
}

pub fn generate_hash_map(
    ast_type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> HashMap<String, TsTypeAliasDecl> {
    ast_type_alias_decls
        .iter()
        .fold(HashMap::new(), |mut acc, ast_type_alias_decl| {
            let type_alias_names = ast_type_alias_decl.id.sym.chars().as_str().to_string();
            acc.insert(type_alias_names, ast_type_alias_decl.clone());
            acc
        })
}

pub fn get_type_alias_decl_name(ts_type_alias_decl: &TsTypeAliasDecl) -> String {
    ident_to_string(&ts_type_alias_decl.id)
}

pub fn is_type_alias_decl_system_structure_type(
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

fn get_identifier_name_for_ts_type(ts_type: &TsType) -> Option<String> {
    match ts_type {
        TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
            TsEntityName::Ident(ident) => Some(ident_to_string(&ident)),
            _ => None,
        },
        _ => None,
    }
}
