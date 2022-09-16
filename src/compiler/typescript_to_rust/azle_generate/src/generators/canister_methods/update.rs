use quote::quote;
use swc_ecma_ast::FnDecl;

use crate::cdk_act::CanisterMethod;

use super::functions;

pub fn generate_update_function_infos(ast_fnc_decls_update: &Vec<FnDecl>) -> Vec<CanisterMethod> {
    ast_fnc_decls_update
        .iter()
        .fold(vec![], |acc, ast_fnc_decl_update| {
            let func_token_stream = generate_update_function_token_stream(ast_fnc_decl_update);
            vec![acc, vec![func_token_stream]].concat()
        })
}

fn generate_update_function_token_stream(ast_fnc_decl_update: &FnDecl) -> CanisterMethod {
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

    CanisterMethod {
        canister_method: token_stream,
        ..function_info
    }
}
