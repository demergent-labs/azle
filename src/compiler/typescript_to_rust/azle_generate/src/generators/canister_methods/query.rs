use quote::quote;
use swc_ecma_ast::FnDecl;

use super::functions;
use crate::cdk_act::{CanisterMethod, CanisterMethodActNode};

pub fn build_query_methods(ast_fnc_decls_query: &Vec<FnDecl>) -> Vec<CanisterMethodActNode> {
    ast_fnc_decls_query
        .iter()
        .fold(vec![], |acc, ast_fnc_decl_query| {
            let query_method = build_query_method(ast_fnc_decl_query);
            vec![acc, vec![query_method]].concat()
        })
}

fn build_query_method(ast_fnc_decl_query: &FnDecl) -> CanisterMethodActNode {
    let function_info = functions::build_canister_method(ast_fnc_decl_query);
    let function_signature_stream = function_info.canister_method;

    let manual_reply_arg = if function_info.is_manual {
        quote! {(manual_reply = true)}
    } else {
        quote! {}
    };

    let token_stream = quote! {
        #[ic_cdk_macros::query#manual_reply_arg]
        #[candid::candid_method(query)]
        #function_signature_stream
    };

    CanisterMethodActNode::QueryMethod(CanisterMethod {
        canister_method: token_stream,
        ..function_info
    })
}
