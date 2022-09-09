use quote::quote;
use swc_ecma_ast::FnDecl;

use super::{functions::FunctionInformation, generate_function_info};

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
    let function_info = generate_function_info(ast_fnc_decl_update);
    let function_token_stream = function_info.function;

    let token_stream = quote! {
        #[ic_cdk_macros::update]
        #[candid::candid_method(update)]
        #function_token_stream
    };

    FunctionInformation {
        function: token_stream,
        ..function_info
    }
}
