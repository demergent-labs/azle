use quote::quote;
use swc_ecma_ast::{
    FnDecl,
    TsKeywordTypeKind::{TsNullKeyword, TsVoidKeyword},
    TsType,
};

use crate::ts_ast;

pub fn generate_canister_method_body(fn_decl: &FnDecl) -> proc_macro2::TokenStream {
    let call_to_js_function = generate_call_to_js_function(fn_decl);
    let return_expression = generate_return_expression(fn_decl);

    quote! {
        unsafe {
            let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

            #call_to_js_function

            let _azle_final_return_value = _azle_async_result_handler(
                &mut _azle_boa_context,
                &_azle_boa_return_value
            ).await;

            #return_expression
        }
    }
}

pub fn generate_call_to_js_function(fn_decl: &FnDecl) -> proc_macro2::TokenStream {
    let function_name = ts_ast::fn_decl::get_fn_decl_function_name(fn_decl);
    let param_name_idents = ts_ast::fn_decl::get_param_name_idents(fn_decl);

    quote! {
        let _azle_exports_js_value = _azle_boa_context.eval("exports").unwrap();
        let _azle_exports_js_object = _azle_exports_js_value.as_object().unwrap();

        let _azle_function_js_value = _azle_exports_js_object.get(#function_name, &mut _azle_boa_context).unwrap();
        let _azle_function_js_object = _azle_function_js_value.as_object().unwrap();

        let _azle_boa_return_value = _azle_function_js_object.call(
            &boa_engine::JsValue::Null,
            &[
                #(#param_name_idents.azle_into_js_value(&mut _azle_boa_context)),*
            ],
            &mut _azle_boa_context
        ).unwrap();
    }
}

/// Generates the return expression for a canister method body
///
/// # Context
///
/// * `_azle_final_return_value: boa_engine::JsValue` - The value to be returned
///    unless this is a ManualReply method.
/// * `_azle_boa_context: &mut boa_engine::Context` - The current boa context
fn generate_return_expression(fn_decl: &FnDecl) -> proc_macro2::TokenStream {
    if ts_ast::fn_decl::is_manual(fn_decl) {
        return quote! {
            ic_cdk::api::call::ManualReply::empty()
        };
    }

    let return_type = ts_ast::fn_decl::get_canister_method_return_type(fn_decl);

    if type_is_null_or_void(return_type) {
        return quote! {
            return;
        };
    }

    quote! {
        _azle_final_return_value.azle_try_from_js_value(&mut _azle_boa_context).unwrap()
    }
}

/// Returns true if the return type is `null`, or `void`. Otherwise returns false.
fn type_is_null_or_void(ts_type_option: Option<&TsType>) -> bool {
    match ts_type_option {
        Some(ts_type) => match ts_type {
            TsType::TsKeywordType(keyword) => match keyword.kind {
                // TODO: Consider handling `TsNeverKeyword` and `TsUndefinedKeyword`
                TsNullKeyword | TsVoidKeyword => true,
                _ => false,
            },
            _ => false,
        },
        None => false,
    }
}
