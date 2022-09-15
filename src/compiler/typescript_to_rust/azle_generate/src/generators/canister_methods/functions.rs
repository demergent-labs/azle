use crate::{
    azle_act::{self, canister_method, rust_types::ActNode},
    generators, ts_ast,
};
use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};
use swc_ecma_ast::FnDecl;

pub fn generate_function_info(ast_fnc_decl: &FnDecl) -> canister_method::CanisterMethod {
    let function_name = ast_fnc_decl.ident.sym.chars().as_str().to_string();
    let function_name_ident = format_ident!("{}", function_name);

    let manual = ts_ast::fn_decl::is_manual(ast_fnc_decl);

    let return_type = generate_return_type(&ast_fnc_decl);
    let return_type_token = return_type.get_type_ident();
    let wrapped_return_type = if manual {
        quote! {
            ic_cdk::api::call::ManualReply<#return_type_token>
        }
    } else {
        return_type_token
    };

    let param_name_idents = generate_param_name_idents(&ast_fnc_decl);
    let param_types = generate_param_types(&ast_fnc_decl);
    let params = generate_params_token_stream(&param_name_idents, &param_types);

    let canister_method_body =
        generators::canister_methods::method_body::generate_canister_method_body(&ast_fnc_decl);

    let function_token_stream = quote! {
        async fn #function_name_ident(#(#params),*) -> #wrapped_return_type {
            #canister_method_body
        }
    };

    let inline_types = vec![param_types, vec![return_type]]
        .concat()
        .iter()
        .filter(|rust_type| rust_type.is_inline_rust_type())
        .fold(vec![], |acc, rust_type| {
            vec![acc, vec![rust_type.clone()]].concat()
        });
    let inline_types: Box<Vec<ActNode>> = Box::from(inline_types);

    canister_method::CanisterMethod {
        canister_method: function_token_stream,
        inline_types,
        is_manual: manual,
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

pub fn generate_params_token_stream(names: &Vec<Ident>, types: &Vec<ActNode>) -> Vec<TokenStream> {
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

fn generate_return_type(ast_fnc_decl: &FnDecl) -> ActNode {
    let return_ts_type = ts_ast::fn_decl::get_return_ts_type(ast_fnc_decl);
    azle_act::types::ts_type_to_rust_type(&return_ts_type, &None)
}

pub fn generate_param_types(ast_fnc_decl: &FnDecl) -> Vec<ActNode> {
    ts_ast::fn_decl::get_param_ts_types(ast_fnc_decl)
        .iter()
        .map(|ts_type| azle_act::types::ts_type_to_rust_type(ts_type, &None))
        .collect()
}
