use quote::format_ident;
use swc_ecma_ast::{FnDecl, Program};
use syn::Ident;

use crate::generators::canister_methods::get_ast_fn_decls_from_programs;

pub enum CanisterMethodType {
    Heartbeat,
    Init,
    InspectMessage,
    PostUpgrade,
    PreUpgrade,
    Query,
    Update,
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

fn is_canister_method_type_fn_decl(
    fn_decl: &FnDecl,
    canister_method_type: &CanisterMethodType,
) -> bool {
    if let Some(ts_type_ann) = &fn_decl.function.return_type {
        if ts_type_ann.type_ann.is_ts_type_ref() {
            let type_ref = ts_type_ann.type_ann.as_ts_type_ref().unwrap();

            if type_ref.type_name.is_ident() {
                let ident = type_ref.type_name.as_ident().unwrap();

                // TODO probably use ident.sym to get the real name without the #0
                match canister_method_type {
                    CanisterMethodType::Heartbeat => ident.to_string() == "Heartbeat#0",
                    CanisterMethodType::Init => ident.to_string() == "Init#0",
                    CanisterMethodType::InspectMessage => ident.to_string() == "InspectMessage#0",
                    CanisterMethodType::PostUpgrade => ident.to_string() == "PostUpgrade#0",
                    CanisterMethodType::PreUpgrade => ident.to_string() == "PreUpgrade#0",
                    CanisterMethodType::Query => ident.to_string() == "Query#0",
                    CanisterMethodType::Update => ident.to_string() == "Update#0",
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
