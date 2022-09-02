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

pub fn get_update_fn_decls(fn_decls: &Vec<FnDecl>) -> Vec<FnDecl> {
    fn_decls
        .clone()
        .into_iter()
        .filter(|fn_decl| is_update_fn_decl(fn_decl))
        .collect()
}

fn is_update_fn_decl(fn_decl: &FnDecl) -> bool {
    if let Some(ts_type_ann) = &fn_decl.function.return_type {
        if ts_type_ann.type_ann.is_ts_type_ref() {
            let type_ref = ts_type_ann.type_ann.as_ts_type_ref().unwrap();

            if type_ref.type_name.is_ident() {
                let ident = type_ref.type_name.as_ident().unwrap();

                ident.to_string() == "Update#0" // TODO probably use ident.sym to get the real name without the #0
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
