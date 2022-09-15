use super::{ident, ts_method_signature, ts_type};
use crate::azle_act::SystemStructureType;
use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
};
use swc_ecma_ast::TsTypeAliasDecl;

// This function is great for debugging but we wont need it in production. Feel
// free to uncomment it if you need it
// pub fn ast_type_alias_decl_to_string(decl: &TsTypeAliasDecl) -> String {
//     decl.id.sym.chars().as_str().to_string()
// }

pub fn get_ast_canister_type_alias_decls(
    type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> Vec<TsTypeAliasDecl> {
    get_ast_type_alias_decls_by_type_ref_name(type_alias_decls, "Canister")
}

pub fn get_ast_type_alias_decls_by_type_ref_name(
    type_alias_decls: &Vec<TsTypeAliasDecl>,
    type_ref_name: &str,
) -> Vec<TsTypeAliasDecl> {
    type_alias_decls
        .clone()
        .into_iter()
        .filter(|ts_type_alias_decl| {
            ts_type_alias_decl.type_ann.is_ts_type_ref()
                && match ts_type_alias_decl.type_ann.as_ts_type_ref() {
                    Some(ts_type_ref) => match ts_type_ref.type_name.as_ident() {
                        Some(ident) => ident.sym.chars().as_str() == type_ref_name,
                        None => false,
                    },
                    None => false,
                }
        })
        .collect()
}

pub fn get_ast_other_type_alias_decls(
    type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> Vec<TsTypeAliasDecl> {
    type_alias_decls
        .clone()
        .into_iter()
        .filter(|ts_type_alias_decl| {
            !ts_type_alias_decl.type_ann.is_ts_type_lit()
                && !ts_type_alias_decl.type_ann.is_ts_tuple_type()
                && (!ts_type_alias_decl.type_ann.is_ts_type_ref()
                    || (ts_type_alias_decl.type_ann.is_ts_type_ref()
                        && match ts_type_alias_decl.type_ann.as_ts_type_ref() {
                            Some(ts_type_ref) => match ts_type_ref.type_name.as_ident() {
                                Some(ident) => {
                                    let name = ident.sym.chars().as_str();
                                    name != "Func" && name != "Variant" && name != "Canister"
                                }
                                None => true,
                            },
                            None => true,
                        }))
        })
        .collect()
}

pub fn get_dependent_types_from_type_alias_decl(
    type_alias_decl: &TsTypeAliasDecl,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    ts_type::get_dependent_types_for_ts_type(
        &*type_alias_decl.type_ann,
        type_alias_lookup,
        found_types,
    )
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
    ident::ident_to_string(&ts_type_alias_decl.id)
}

pub fn is_type_alias_decl_system_structure_type(
    type_alias_decl: &TsTypeAliasDecl,
    system_structure_type: &SystemStructureType,
) -> bool {
    // let type_alias_decl
    match system_structure_type {
        SystemStructureType::Canister => {
            let type_reference_name_option =
                ts_type::get_identifier_name_for_ts_type(&*type_alias_decl.type_ann);

            match type_reference_name_option {
                Some(type_reference_name) => type_reference_name == "Canister",
                None => false,
            }
        }
    }
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
                let return_types = ts_method_signature::get_return_ts_type_from_method(method_sig);
                let param_types = ts_method_signature::get_param_ts_types_from_method(method_sig);
                vec![acc, vec![return_types], param_types].concat()
            }
            _ => todo!("There should only be Method Signatures on a Canister type?"),
        });

    // Get the goods out of a method signature
    ts_types.iter().fold(found_types.clone(), |acc, ts_type| {
        let result = HashSet::from_iter(
            ts_type::get_dependent_types_for_ts_type(ts_type, &type_alias_lookup, &acc)
                .iter()
                .cloned(),
        );
        acc.union(&result).cloned().collect()
    })
}
