use quote::quote;
use swc_ecma_ast::FnDecl;

use super::{functions::FunctionInformation, generate_function_info};

pub fn generate_query_function_infos(
    ast_fnc_decls_query: &Vec<FnDecl>,
    inline_dep_count: u32,
) -> (Vec<FunctionInformation>, u32) {
    ast_fnc_decls_query.iter().fold(
        (vec![], inline_dep_count),
        |(acc, count), ast_fnc_decl_query| {
            let (function_token_stream, count) =
                generate_query_function_info(ast_fnc_decl_query, count);
            (vec![acc, vec![function_token_stream]].concat(), count)
        },
    )
}

fn generate_query_function_info(
    ast_fnc_decl_query: &FnDecl,
    inline_dep_count: u32,
) -> (FunctionInformation, u32) {
    let mut inline_dep_count = inline_dep_count;
    let (function_info, count) = generate_function_info(ast_fnc_decl_query, inline_dep_count);
    inline_dep_count = count;
    let function_token_stream = function_info.token_stream;

    let token_stream = quote! {
        #[ic_cdk_macros::query]
        #[candid::candid_method(query)]
        #function_token_stream
    };

    (
        FunctionInformation {
            token_stream,
            ..function_info
        },
        inline_dep_count,
    )
}

pub fn get_query_fn_decls(fn_decls: &Vec<FnDecl>) -> Vec<FnDecl> {
    fn_decls
        .clone()
        .into_iter()
        .filter(|fn_decl| is_query_fn_decl(fn_decl))
        .collect()
}

fn is_query_fn_decl(fn_decl: &FnDecl) -> bool {
    if let Some(ts_type_ann) = &fn_decl.function.return_type {
        if ts_type_ann.type_ann.is_ts_type_ref() {
            let type_ref = ts_type_ann.type_ann.as_ts_type_ref().unwrap();

            if type_ref.type_name.is_ident() {
                let ident = type_ref.type_name.as_ident().unwrap();

                ident.to_string() == "Query#0" // TODO probably use ident.sym to get the real name without the #0
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
