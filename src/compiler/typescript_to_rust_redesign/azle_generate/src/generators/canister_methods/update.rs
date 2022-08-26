use quote::{
    quote,
};
use swc_ecma_ast::FnDecl;

use super::{generate_function_info, functions::FunctionInformation};

pub fn generate_update_function_token_streams(ast_fnc_decls_update: &Vec<FnDecl>, count: u32) -> (Vec<FunctionInformation>, u32) {
    ast_fnc_decls_update.iter().fold((vec![], count), |acc, ast_fnc_decl_update| {
        let result = generate_update_function_token_stream(ast_fnc_decl_update, acc.1);
        let count = result.1;
        (vec![acc.0, vec![result.0]].concat(), count)
    })
}

fn generate_update_function_token_stream(ast_fnc_decl_update: &FnDecl, count: u32) -> (FunctionInformation, u32) {
    let function_info = generate_function_info(ast_fnc_decl_update, count);
    let count = function_info.1;
    let function_info = function_info.0;
    let function_token_stream = function_info.token_stream;

    let token_stream = quote! {
        #[ic_cdk_macros::update]
        #[candid::candid_method(update)]
        #function_token_stream
    };

    (FunctionInformation {token_stream, ..function_info }, count)
}

pub fn get_update_fn_decls(fn_decls: &Vec<FnDecl>) -> Vec<FnDecl> {
    fn_decls.clone().into_iter().filter(|fn_decl| is_update_fn_decl(fn_decl)).collect()
}

fn is_update_fn_decl(fn_decl: &FnDecl) -> bool {
    if let Some(ts_type_ann) = &fn_decl.function.return_type {
        if ts_type_ann.type_ann.is_ts_type_ref() {
            let type_ref = ts_type_ann.type_ann.as_ts_type_ref().unwrap();

            if type_ref.type_name.is_ident() {
                let ident = type_ref.type_name.as_ident().unwrap();

                ident.to_string() == "Update#0" // TODO probably use ident.sym to get the real name without the #0
            }
            else {
                false
            }
        }
        else {
            false
        }
    }
    else {
        false
    }
}
