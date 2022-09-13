use quote::format_ident;
use std::{collections::HashSet, iter::FromIterator};
use swc_ecma_ast::{FnDecl, TsType, TsTypeAliasDecl};
use syn::Ident;

use super::{ts_type, ts_type_alias_decl};
use crate::azle_ast::CanisterMethodType;

pub fn get_canister_method_return_type(fn_decl: &FnDecl) -> Option<&TsType> {
    let ts_type = &*fn_decl.function.return_type.as_ref().unwrap().type_ann;
    let type_ref = ts_type.as_ts_type_ref().unwrap();
    let type_param_instantiation_option = &type_ref.type_params.as_ref();
    match type_param_instantiation_option {
        Some(type_param_inst) => Some(&*type_param_inst.params[0]),
        None => None,
    }
}

pub fn get_dependent_types_from_fn_decls(
    fn_decls: &Vec<FnDecl>,
    possible_dependencies: &Vec<TsTypeAliasDecl>,
) -> HashSet<String> {
    // TODO the found types are resetting every once and a while. I am guessing it's as we start another function or maybe a different type in that function. Either way it might be slightly more efficient to continually build up the list to avoid redundancy
    fn_decls.iter().fold(HashSet::new(), |acc, fn_decl| {
        acc.union(&get_dependent_types_from_fn_decl(
            fn_decl,
            possible_dependencies,
            &acc,
        ))
        .cloned()
        .collect()
    })
}

pub fn get_fn_decl_function_name(fn_decl: &FnDecl) -> String {
    fn_decl.ident.sym.chars().as_str().to_string()
}

pub fn get_param_name_idents(fn_decl: &FnDecl) -> Vec<Ident> {
    fn_decl
        .function
        .params
        .iter()
        .map(|param| {
            format_ident!(
                "{}",
                param
                    .pat
                    .as_ident()
                    .unwrap()
                    .sym
                    .chars()
                    .as_str()
                    .to_string()
            )
        })
        .collect()
}

pub fn get_param_ts_types(ast_fnc_decl: &FnDecl) -> Vec<TsType> {
    let params = &ast_fnc_decl.function.params;
    params.iter().fold(vec![], |acc, param| {
        let param_type_ann = &param.pat.as_ident().unwrap().type_ann.as_ref();
        let param_type_ann = param_type_ann.clone().unwrap();
        let param_ts_type = *param_type_ann.type_ann.clone();

        vec![acc, vec![param_ts_type]].concat()
    })
}

pub fn get_return_ts_type(ast_fnc_decl: &FnDecl) -> TsType {
    let ts_type_ann = ast_fnc_decl.function.return_type.as_ref();
    let return_type_ann = ts_type_ann.clone().unwrap();
    let return_type_ref = return_type_ann.type_ann.as_ts_type_ref().unwrap();
    let return_type_params = return_type_ref.type_params.clone().unwrap();

    let return_ts_type = *return_type_params.params[0].clone();
    return_ts_type
}

pub fn is_canister_method_type_fn_decl(
    fn_decl: &FnDecl,
    canister_method_type: &CanisterMethodType,
) -> bool {
    if let Some(ts_type_ann) = &fn_decl.function.return_type {
        if ts_type_ann.type_ann.is_ts_type_ref() {
            let type_ref = ts_type_ann.type_ann.as_ts_type_ref().unwrap();

            if type_ref.type_name.is_ident() {
                let ident = type_ref.type_name.as_ident().unwrap();
                let method_type = ident.sym.chars().as_str();

                match canister_method_type {
                    CanisterMethodType::Heartbeat => method_type == "Heartbeat",
                    CanisterMethodType::Init => method_type == "Init",
                    CanisterMethodType::InspectMessage => method_type == "InspectMessage",
                    CanisterMethodType::PostUpgrade => method_type == "PostUpgrade",
                    CanisterMethodType::PreUpgrade => method_type == "PreUpgrade",
                    CanisterMethodType::Query => {
                        method_type == "Query" || method_type == "QueryManual"
                    }
                    CanisterMethodType::Update => {
                        method_type == "Update" || method_type == "UpdateManual"
                    }
                }
            } else {
                false
            }
        } else {
            false
        }
    } else {
        false
    }
}

pub fn is_manual(fn_decl: &FnDecl) -> bool {
    let type_ann = fn_decl.function.return_type.as_ref().unwrap();
    match &*type_ann.type_ann {
        TsType::TsTypeRef(type_ref) => match &type_ref.type_name {
            swc_ecma_ast::TsEntityName::Ident(ident) => {
                let mode = ident.sym.chars().as_str();

                mode == "QueryManual" || mode == "UpdateManual"
            }
            swc_ecma_ast::TsEntityName::TsQualifiedName(_) => {
                panic!("Qualified Names are not currently supported")
            }
        },
        _ => panic!("Canister methods must have a return type of Query<T>, Update<T>, or Oneway"),
    }
}

fn get_dependent_types_from_fn_decl(
    fn_decl: &FnDecl,
    possible_dependencies: &Vec<TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> HashSet<String> {
    let type_alias_lookup = ts_type_alias_decl::generate_hash_map(possible_dependencies);
    let return_types = get_return_ts_type(fn_decl);
    let param_types = get_param_ts_types(fn_decl);
    let ts_types = vec![vec![return_types], param_types].concat();

    ts_types.iter().fold(found_types.clone(), |acc, ts_type| {
        let result = HashSet::from_iter(
            ts_type::get_dependent_types_for_ts_type(ts_type, &type_alias_lookup, &acc)
                .iter()
                .cloned(),
        );
        acc.union(&result).cloned().collect()
    })
}
