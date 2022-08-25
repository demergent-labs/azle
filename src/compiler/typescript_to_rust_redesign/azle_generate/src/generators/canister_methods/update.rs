use quote::{
    quote,
};
use swc_ecma_ast::FnDecl;

use super::{generate_function_info, functions::FunctionInformation};

pub fn generate_update_function_token_streams(ast_fnc_decls_update: &Vec<FnDecl>) -> Vec<FunctionInformation> {
    ast_fnc_decls_update.iter().map(|ast_fnc_decl_update| {
        generate_update_function_token_stream(ast_fnc_decl_update)
    }).collect()
}

fn generate_update_function_token_stream(ast_fnc_decl_update: &FnDecl) -> FunctionInformation {
    let function_info = generate_function_info(ast_fnc_decl_update);
    let function_token_stream = function_info.token_stream;

    let token_stream = quote! {
        #[ic_cdk_macros::update]
        #[candid::candid_method(update)]
        #function_token_stream
    };

    FunctionInformation {token_stream, dependant_types: function_info.dependant_types }
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
