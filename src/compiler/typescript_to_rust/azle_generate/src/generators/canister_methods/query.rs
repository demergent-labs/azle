use quote::quote;
use swc_ecma_ast::FnDecl;

use crate::cdk_act::CanisterMethod;

use super::functions;

pub fn generate_query_function_infos(ast_fnc_decls_query: &Vec<FnDecl>) -> Vec<CanisterMethod> {
    ast_fnc_decls_query
        .iter()
        .fold(vec![], |acc, ast_fnc_decl_query| {
            let function_token_stream = generate_query_function_info(ast_fnc_decl_query);
            vec![acc, vec![function_token_stream]].concat()
        })
}

fn generate_query_function_info(ast_fnc_decl_query: &FnDecl) -> CanisterMethod {
    let function_info = functions::generate_canister_method_node(ast_fnc_decl_query);
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

    CanisterMethod {
        canister_method: token_stream,
        ..function_info
    }
}
