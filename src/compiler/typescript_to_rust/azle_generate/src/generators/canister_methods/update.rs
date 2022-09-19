use quote::quote;
use swc_ecma_ast::FnDecl;

use super::functions;
use crate::cdk_act::{CanisterMethod, CanisterMethodActNode};

pub fn build_update_methods(ast_fnc_decls_update: &Vec<FnDecl>) -> Vec<CanisterMethodActNode> {
    ast_fnc_decls_update
        .iter()
        .fold(vec![], |acc, ast_fnc_decl_update| {
            let update_method = build_update_method(ast_fnc_decl_update);
            vec![acc, vec![update_method]].concat()
        })
}

fn build_update_method(ast_fnc_decl_update: &FnDecl) -> CanisterMethodActNode {
    let function_info = functions::generate_canister_method_node(ast_fnc_decl_update);
    let function_token_stream = function_info.canister_method;

    let manual_reply_arg = if function_info.is_manual {
        quote! {(manual_reply = true)}
    } else {
        quote! {}
    };

    let token_stream = quote! {
        #[ic_cdk_macros::update#manual_reply_arg]
        #[candid::candid_method(update)]
        #function_token_stream
    };

    CanisterMethodActNode::UpdateMethod(CanisterMethod {
        canister_method: token_stream,
        ..function_info
    })
}
