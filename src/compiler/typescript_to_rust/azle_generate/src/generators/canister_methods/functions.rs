use crate::{
    cdk_act::{act_data_type_node::ActDataTypeNode, CanisterMethod},
    generators,
    ts_ast::{self, ts_types_to_act},
};
use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};
use swc_ecma_ast::FnDecl;

pub fn build_canister_method(ast_fnc_decl: &FnDecl) -> CanisterMethod {
    let body =
        generators::canister_methods::method_body::generate_canister_method_body(&ast_fnc_decl);

    let param_names = generate_param_name_idents(&ast_fnc_decl);
    let param_types = generate_param_types(&ast_fnc_decl);

    let is_manual = ts_ast::fn_decl::is_manual(ast_fnc_decl);
    let name = ts_ast::fn_decl::get_fn_decl_function_name(ast_fnc_decl);

    let return_type = generate_return_type(&ast_fnc_decl);

    // TODO: This and the return type above should likely be combined somehow
    let possible_repeat_return_type_ast =
        ts_ast::fn_decl::get_canister_method_return_type(ast_fnc_decl);
    let rust_return_type = match possible_repeat_return_type_ast {
        Some(ts_type) => ts_types_to_act::ts_type_to_act_node(ts_type, &None).get_type_ident(),
        None => quote! {()},
    };

    let inline_types = vec![param_types.clone(), vec![return_type.clone()]]
        .concat()
        .iter()
        .filter(|rust_type| rust_type.is_inline_rust_type())
        .fold(vec![], |acc, rust_type| {
            vec![acc, vec![rust_type.clone()]].concat()
        });
    let inline_types: Box<Vec<ActDataTypeNode>> = Box::from(inline_types);

    CanisterMethod {
        body,
        param_names,
        param_types,
        inline_types,
        is_manual,
        name,
        return_type,
        rust_return_type,
    }
}

pub fn generate_param_name_idents(ast_fn_decl: &FnDecl) -> Vec<Ident> {
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

pub fn generate_params_token_stream(
    names: &Vec<Ident>,
    types: &Vec<ActDataTypeNode>,
) -> Vec<TokenStream> {
    names
        .iter()
        .enumerate()
        .map(|(i, name)| {
            let param_type_token_stream = types[i].get_type_ident();
            quote! {
                #name: #param_type_token_stream
            }
        })
        .collect()
}

fn generate_return_type(ast_fnc_decl: &FnDecl) -> ActDataTypeNode {
    let return_ts_type = ts_ast::fn_decl::get_return_ts_type(ast_fnc_decl);
    ts_types_to_act::ts_type_to_act_node(&return_ts_type, &None)
}

pub fn generate_param_types(ast_fnc_decl: &FnDecl) -> Vec<ActDataTypeNode> {
    ts_ast::fn_decl::get_param_ts_types(ast_fnc_decl)
        .iter()
        .map(|ts_type| ts_types_to_act::ts_type_to_act_node(ts_type, &None))
        .collect()
}
