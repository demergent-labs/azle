use quote::quote;
use swc_ecma_ast::FnDecl;

use crate::azle_act::canister_method_act::FunctionInformation;

use super::functions;

pub fn generate_update_function_infos(
    ast_fnc_decls_update: &Vec<FnDecl>,
) -> Vec<FunctionInformation> {
    ast_fnc_decls_update
        .iter()
        .fold(vec![], |acc, ast_fnc_decl_update| {
            let func_token_stream = generate_update_function_token_stream(ast_fnc_decl_update);
            vec![acc, vec![func_token_stream]].concat()
        })
}

fn generate_update_function_token_stream(ast_fnc_decl_update: &FnDecl) -> FunctionInformation {
    let function_info = functions::generate_function_info(ast_fnc_decl_update);
    let function_token_stream = function_info.function;

    let manual_reply_arg = if function_info.manual {
        quote! {(manual_reply = true)}
    } else {
        quote! {}
    };

    let token_stream = quote! {
        #[ic_cdk_macros::update#manual_reply_arg]
        #[candid::candid_method(update)]
        #function_token_stream
    };

    FunctionInformation {
        function: token_stream,
        ..function_info
    }
}
