use proc_macro2::Ident;
use quote::format_ident;
use swc_ecma_ast::FnDecl;

use crate::{
    cdk_act::{data_type_nodes::ActDataTypeNode, nodes::Param, CanisterMethod},
    generators,
    ts_ast::{self, ts_types_to_act},
};

pub fn build_canister_method(ast_fnc_decl: &FnDecl) -> CanisterMethod {
    let body =
        generators::canister_methods::method_body::generate_canister_method_body(&ast_fnc_decl);
    let is_manual = ts_ast::fn_decl::is_manual(ast_fnc_decl);
    let name = ts_ast::fn_decl::get_fn_decl_function_name(ast_fnc_decl);
    let params = build_params(ast_fnc_decl);
    let return_type = build_return_type(&ast_fnc_decl);

    CanisterMethod {
        body,
        is_manual,
        name,
        params,
        return_type,
    }
}

pub fn build_params(fn_decl: &FnDecl) -> Vec<Param> {
    let names = get_param_name_idents(&fn_decl);
    let types = build_param_types(&fn_decl);
    names
        .iter()
        .enumerate()
        .map(|(i, name)| Param {
            name: name.clone(),
            data_type: types[i].clone(),
        })
        .collect()
}

pub fn get_param_name_idents(ast_fn_decl: &FnDecl) -> Vec<Ident> {
    let params = &ast_fn_decl.function.params;
    params
        .iter()
        .map(|param| {
            let thing = param
                .pat
                .as_ident()
                .unwrap()
                .sym
                .chars()
                .as_str()
                .to_string();
            format_ident!("{}", thing)
        })
        .collect()
}

fn build_return_type(ast_fnc_decl: &FnDecl) -> ActDataTypeNode {
    let return_ts_type = ts_ast::fn_decl::get_return_ts_type(ast_fnc_decl);
    ts_types_to_act::ts_type_to_act_node(&return_ts_type, &None)
}

fn build_param_types(ast_fnc_decl: &FnDecl) -> Vec<ActDataTypeNode> {
    ts_ast::fn_decl::get_param_ts_types(ast_fnc_decl)
        .iter()
        .map(|ts_type| ts_types_to_act::ts_type_to_act_node(ts_type, &None))
        .collect()
}
